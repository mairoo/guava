import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store';
import { useSyncCartMutation } from '@/store/cart/api';
import { addItem, removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { CartItem } from '@/types/cart';
import { useCallback, useRef } from 'react';

// 장바구니 동기화 요청간 최소 대기 시간 (밀리초)
// 잦은 서버 요청을 방지하기 위해 사용
const SYNC_DEBOUNCE_TIME = 2000;

/**
 * 장바구니의 상태 관리와 서버 동기화를 담당하는 커스텀 훅
 *
 * 주요 기능:
 * - 장바구니 아이템 추가/제거/수량 변경
 * - 서버와의 자동 동기화 (디바운스 처리)
 * - 사용자 피드백 (토스트 메시지)
 *
 * @returns {Object} 장바구니 조작을 위한 메서드들
 */
export const useCartActions = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const [syncCart] = useSyncCartMutation();

  // 디바운스 타이머 참조를 저장하기 위한 ref
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Redux 스토어에서 최신 장바구니 상태를 가져오는 유틸리티 함수
   * 서버 동기화 시점의 실시간 상태가 필요할 때 사용
   *
   * @returns {CartItem[]} 현재 장바구니 아이템 목록
   */
  const getLatestCartItems = useCallback(() => {
    return store.getState().cart.items;
  }, []);

  /**
   * 장바구니 상태를 서버와 동기화하는 함수 (디바운스 처리)
   * - 비인증 상태에서는 동작하지 않음
   * - 연속된 호출에서 마지막 호출만 실행
   * - 실패 시 사용자에게 피드백 제공
   *
   * @returns {Promise<void>}
   */
  const debouncedSync = useCallback(async (): Promise<void> => {
    // 비인증 상태에서는 동기화 하지 않음
    if (!isAuthenticated) return;

    try {
      // 이전 타이머가 있다면 취소
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }

      await new Promise<void>((resolve) => {
        // 디바운스된 동기화 작업 설정
        syncTimerRef.current = setTimeout(async () => {
          try {
            // 동기화 시점의 최신 상태 가져오기
            const currentCart = getLatestCartItems();
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
  }, [isAuthenticated, syncCart]);

  /**
   * 장바구니 아이템의 수량을 변경하는 핸들러
   *
   * @param productId - 변경할 상품의 ID
   * @param delta - 수량 변경값 (양수: 증가, 음수: 감소)
   * @param currentQuantity - 현재 수량
   */
  const handleQuantityChange = useCallback(
    (productId: number, delta: number, currentQuantity: number) => {
      // 최소 수량은 1로 제한
      const newQuantity = Math.max(1, currentQuantity + delta);

      // 로컬 상태 업데이트 및 서버 동기화
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
      debouncedSync();
    },
    [dispatch, debouncedSync],
  );

  /**
   * 장바구니에서 아이템을 제거하는 핸들러
   * - 인증된 사용자의 경우 즉시 서버 동기화 수행
   *
   * @param productId - 제거할 상품의 ID
   */
  const handleRemove = useCallback(
    async (productId: number) => {
      // 로컬 상태에서 아이템 제거
      dispatch(removeItem(productId));

      // 인증된 사용자의 경우 즉시 서버 동기화
      if (isAuthenticated) {
        try {
          const currentCart = getLatestCartItems();
          await syncCart(currentCart).unwrap();
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
    [dispatch, isAuthenticated, syncCart, getLatestCartItems],
  );

  /**
   * 장바구니에 새 아이템을 추가하는 핸들러
   * - 추가 성공/실패 시 사용자 피드백 제공
   * - 추가 후 서버 동기화 수행
   *
   * @param cartItem - 추가할 장바구니 아이템 정보
   */
  const handleAddToCart = useCallback(
    async (cartItem: CartItem) => {
      try {
        // 로컬 상태에 아이템 추가 및 서버 동기화
        dispatch(addItem(cartItem));
        await debouncedSync();

        // 성공 피드백
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
