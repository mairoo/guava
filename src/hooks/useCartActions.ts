import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSyncCartMutation } from '@/store/cart/api';
import { removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useRef } from 'react';

// 장바구니 동기화 디바운스 시간 (밀리초)
const SYNC_DEBOUNCE_TIME = 2000;

/**
 * 장바구니 관련 액션들을 처리하는 커스텀 훅
 * - 수량 변경 및 아이템 제거 기능 제공
 * - 서버 동기화 디바운싱 처리
 * - 로컬 상태와 서버 상태의 일관성 유지
 */
export const useCartActions = () => {
  // Redux 관련 훅
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // 인증 상태 및 API 훅
  const { isAuthenticated } = useAuth();
  const [syncCart] = useSyncCartMutation();

  // Refs for tracking state
  const currentQuantitiesRef = useRef<Record<number, number>>({}); // 실제 수량 추적
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null); // 디바운스 타이머

  /**
   * cartItems 변경 시 현재 수량 상태 초기화
   */
  useEffect(() => {
    const quantities: Record<number, number> = {};
    cartItems.forEach((item) => {
      quantities[item.productId] = item.quantity;
    });
    currentQuantitiesRef.current = quantities;
  }, [cartItems]);

  /**
   * 디바운스된 장바구니 동기화 함수
   * - 마지막 호출로부터 SYNC_DEBOUNCE_TIME 이후에 실행
   * - 이전 타이머가 있다면 취소하고 새로운 타이머 설정
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
        // 현재 로컬의 수량 상태로 동기화
        const itemsToSync = cartItems.map((item) => ({
          ...item,
          quantity:
            currentQuantitiesRef.current[item.productId] || item.quantity,
        }));

        await syncCart(itemsToSync).unwrap();
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
   * 장바구니 아이템 수량 변경 핸들러
   * @param productId 상품 ID
   * @param delta 변경할 수량 (양수: 증가, 음수: 감소)
   * @param currentQuantity 현재 수량
   */
  const handleQuantityChange = useCallback(
    (productId: number, delta: number, currentQuantity: number) => {
      // 현재 추적 중인 수량을 기준으로 새로운 수량 계산
      const trackedQuantity =
        currentQuantitiesRef.current[productId] || currentQuantity;
      const newQuantity = Math.max(1, trackedQuantity + delta);

      // 추적 중인 수량 업데이트
      currentQuantitiesRef.current[productId] = newQuantity;

      // Redux 상태 업데이트 및 서버 동기화
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
      debouncedSync();
    },
    [dispatch, debouncedSync],
  );

  /**
   * 장바구니 아이템 제거 핸들러
   * @param productId 제거할 상품 ID
   */
  const handleRemove = useCallback(
    async (productId: number) => {
      // 추적 중인 수량에서 제거
      delete currentQuantitiesRef.current[productId];

      // Redux 상태 업데이트
      dispatch(removeItem(productId));

      // 인증된 사용자의 경우 서버 동기화 수행
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

  return { handleQuantityChange, handleRemove };
};
