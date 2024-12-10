import { removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (
    productId: number,
    delta: number,
    currentQuantity: number,
  ) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeItem(productId));
  };

  return { handleQuantityChange, handleRemove };
};
