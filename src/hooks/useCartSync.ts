import { cartApi } from '@/store/cart/api';
import { mergeCart } from '@/store/cart/slice';
import { useDispatch } from 'react-redux';

interface UseCartSyncReturn {
  syncCart: () => Promise<void>;
  isLoading: boolean;
}

/**
 * 장바구니 서버 동기화를 처리하는 커스텀 훅
 * 서버의 장바구니 데이터를 로컬 상태와 동기화
 *
 * @returns {UseCartSyncReturn} syncCart 함수와 로딩 상태
 */
export const useCartSync = (): UseCartSyncReturn => {
  // Redux
  const dispatch = useDispatch();

  // RTK Query Hooks
  const [getCart, { isLoading }] = cartApi.endpoints.getCart.useLazyQuery();

  /**
   * 서버의 장바구니 데이터를 조회하여 로컬 상태와 동기화하는 함수
   * 초기 로그인 시에는 서버 데이터를 로컬에 반영하는 것이 목적
   *
   * @throws {Error} 장바구니 동기화 실패 시 에러
   */
  const syncCart = async () => {
    if (isLoading) return;

    try {
      const { data: serverCart = [] } = await getCart();
      dispatch(mergeCart(serverCart));
    } catch (error) {
      console.error('장바구니 동기화 실패:', error);
      throw error;
    }
  };

  return {
    syncCart,
    isLoading,
  };
};
