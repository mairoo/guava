import { cartApi } from '@/store/cart/api';

interface UseFetchCartReturn {
  fetchCart: () => Promise<void>;
  isLoading: boolean;
}

export const useFetchCart = (): UseFetchCartReturn => {
  const [getCart, { isLoading }] = cartApi.endpoints.fetchCart.useLazyQuery();

  const fetchCart = async () => {
    if (isLoading) return;

    try {
      await getCart();
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
