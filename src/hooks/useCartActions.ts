import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store';
import { useSyncCartMutation } from '@/store/cart/api';
import { addItem, removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CartItem } from '@/types/cart';
import { useCallback, useEffect, useRef } from 'react'; // 장바구니 동기화 디바운스 시간 (밀리초)

// 장바구니 동기화 디바운스 시간 (밀리초)
const SYNC_DEBOUNCE_TIME = 2000;

/**
 * 장바구니 상태 관리와 서버 동기화를 담당하는 훅
 * Redux store 접근과 서버 통신을 중앙화하여 처리
 */
export const useCartActions = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const { isAuthenticated } = useAuth();
  const [syncCart] = useSyncCartMutation();

  // 수량 추적을 위한 refs
  const currentQuantitiesRef = useRef<Record<number, number>>({});
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  // cartItems 변경 시 현재 수량 상태 초기화
  useEffect(() => {
    const quantities: Record<number, number> = {};
    cartItems.forEach((item) => {
      quantities[item.productId] = item.quantity;
    });
    currentQuantitiesRef.current = quantities;
  }, [cartItems]);

  /**
   * 장바구니 서버 동기화 함수 (디바운스 처리)
   */
  const debouncedSync = useCallback(async (): Promise<void> => {
    try {
      if (!isAuthenticated) return;

      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }

      await new Promise<void>((resolve) => {
        syncTimerRef.current = setTimeout(async () => {
          try {
            // Redux 가장 최신 장바구니 상태를 가지고 와야 한다.
            const currentCart = store.getState().cart.items;
            await syncCart(currentCart).unwrap();
            syncTimerRef.current = null;
            resolve();
          } catch (error) {
            console.error('Failed to sync cart:', error);
            toast({
              variant: 'destructive',
              title: '장바구니 동기화 실패',
              description: '잠시 후 다시 시도해주세요.',
            });
            resolve();
          }
        }, SYNC_DEBOUNCE_TIME);
      });
    } catch (error) {
      console.error('Failed to setup sync:', error);
      toast({
        variant: 'destructive',
        title: '장바구니 동기화 실패',
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  }, [isAuthenticated, syncCart, cartItems]);

  /**
   * 장바구니 아이템 수량 변경 처리
   */
  const handleQuantityChange = useCallback(
    (productId: number, delta: number, currentQuantity: number) => {
      const trackedQuantity =
        currentQuantitiesRef.current[productId] || currentQuantity;
      const newQuantity = Math.max(1, trackedQuantity + delta);

      currentQuantitiesRef.current[productId] = newQuantity;

      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
      debouncedSync();
    },
    [dispatch, debouncedSync],
  );

  /**
   * 장바구니 아이템 제거 처리
   */
  const handleRemove = useCallback(
    async (productId: number) => {
      delete currentQuantitiesRef.current[productId];
      dispatch(removeItem(productId));

      if (isAuthenticated) {
        try {
          const currentLocalState = cartItems.filter(
            (item) => item.productId !== productId,
          );
          await syncCart(currentLocalState).unwrap();
        } catch (error) {
          console.error('Failed to sync cart after remove:', error);
          toast({
            variant: 'destructive',
            title: '장바구니 동기화 실패',
            description: '잠시 후 다시 시도해주세요.',
          });
        }
      }
    },
    [dispatch, isAuthenticated, syncCart, cartItems],
  );

  /**
   * 장바구니 아이템 추가 처리
   */
  const handleAddToCart = useCallback(
    async (cartItem: CartItem) => {
      try {
        dispatch(addItem(cartItem));
        await debouncedSync();

        toast({
          title: `${cartItem.name} ${cartItem.subtitle || ''}`,
          description: '장바구니에 담았습니다.',
          duration: 1500,
          className: 'bg-blue-100 border border-blue-300 shadow-lg',
        });
      } catch (error) {
        console.error('장바구니 추가 실패:', error);
        toast({
          variant: 'destructive',
          title: '장바구니 추가 실패',
          description: '잠시 후 다시 시도해주세요.',
        });
      }
    },
    [dispatch, debouncedSync],
  );

  return {
    handleQuantityChange,
    handleRemove,
    handleAddToCart,
  };
};
