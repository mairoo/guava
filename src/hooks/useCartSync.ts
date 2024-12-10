import { store } from '@/store';
import { cartApi, useSyncCartMutation } from '@/store/cart/api';
import { mergeCart } from '@/store/cart/slice';
import { useDispatch } from 'react-redux';

interface UseCartSyncReturn {
  syncCart: () => Promise<void>;
  isLoading: boolean;
}

export const useCartSync = (): UseCartSyncReturn => {
  const dispatch = useDispatch();
  const [getCart] = cartApi.endpoints.getCart.useLazyQuery();
  const [syncCartMutation, { isLoading }] = useSyncCartMutation();

  const syncCart = async () => {
    try {
      // 서버의 장바구니 데이터 조회
      const { data: serverCart = [] } = await getCart();

      // 로컬 장바구니와 서버 장바구니를 병합
      dispatch(mergeCart(serverCart));

      // 병합된 최신 상태를 서버에 동기화
      const currentCart = store.getState().cart.items;
      await syncCartMutation(currentCart).unwrap();
    } catch (error) {
      console.error('장바구니 동기화 실패:', error);
      throw error; // 에러를 상위로 전파하여 호출하는 쪽에서 처리할 수 있도록 함
    }
  };

  return {
    syncCart,
    isLoading,
  };
};
