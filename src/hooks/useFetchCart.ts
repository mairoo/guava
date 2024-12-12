import { cartApi } from '@/store/cart/api';
import { mergeCart } from '@/store/cart/slice';
import { useDispatch } from 'react-redux';

interface UseFetchCartReturn {
  fetchCart: () => Promise<void>;
  isLoading: boolean;
}

export const useFetchCart = (): UseFetchCartReturn => {
  const dispatch = useDispatch();
  const [getCart, { isLoading }] = cartApi.endpoints.fetchCart.useLazyQuery();

  const fetchCart = async () => {
    if (isLoading) return;

    try {
      const { data: serverCart = [] } = await getCart();
      dispatch(mergeCart(serverCart));
    } catch (error) {
      console.error('장바구니 가져오기 실패:', error);
      throw error;
    }
  };

  return {
    fetchCart,
    isLoading,
  };
};
