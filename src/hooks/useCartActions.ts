import { toast } from '@/hooks/use-toast'; // 디바운스 타임아웃 (밀리초)
import { useAuth } from '@/providers/auth/AuthProvider';
import { useSyncCartMutation } from '@/store/cart/api';
import { removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useRef } from 'react';

// 디바운스 타임아웃 (밀리초)
const SYNC_DEBOUNCE_TIME = 2000;

export const useCartActions = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [syncCart] = useSyncCartMutation();

  // 디바운스 타이머 ref
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 디바운스된 장바구니 동기화 함수
   * - 마지막 호출로부터 SYNC_DEBOUNCE_TIME 이후에 실행
   * - 이전 타이머가 있다면 취소
   */
  const debouncedSync = useCallback(async () => {
    try {
      if (!isAuthenticated) return;

      // 이전 타이머가 있다면 취소
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }

      // 새로운 타이머 설정
      syncTimerRef.current = setTimeout(async () => {
        await syncCart(cartItems).unwrap();
        syncTimerRef.current = null;
      }, SYNC_DEBOUNCE_TIME);
    } catch (error) {
      console.error('Failed to sync cart:', error);
      toast({
        variant: 'destructive',
        title: '장바구니 동기화 실패',
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  }, [isAuthenticated, syncCart, cartItems]);

  /**
   * 수량 변경 핸들러
   * - 로컬 상태 즉시 업데이트
   * - 디바운스된 서버 동기화 실행
   */
  const handleQuantityChange = useCallback(
    (productId: number, delta: number, currentQuantity: number) => {
      const newQuantity = Math.max(1, currentQuantity + delta);
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
      debouncedSync();
    },
    [dispatch, debouncedSync],
  );

  /**
   * 아이템 제거 핸들러
   * - 로컬 상태 즉시 업데이트
   * - 즉시 서버 동기화 실행 (제거는 중요한 작업이므로 디바운스하지 않음)
   */
  const handleRemove = useCallback(
    async (productId: number) => {
      dispatch(removeItem(productId));
      if (isAuthenticated) {
        try {
          // 제거는 즉시 동기화
          await syncCart(
            cartItems.filter((item) => item.productId !== productId),
          ).unwrap();
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

  return { handleQuantityChange, handleRemove };
};
