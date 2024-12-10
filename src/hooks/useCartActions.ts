import { removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { useCallback } from 'react';

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = useCallback(
    (productId: number, delta: number, currentQuantity: number) => {
      const newQuantity = Math.max(1, currentQuantity + delta);
      dispatch(updateItemQuantity({ productId, quantity: newQuantity }));
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (productId: number) => {
      dispatch(removeItem(productId));
    },
    [dispatch],
  );

  return { handleQuantityChange, handleRemove };
};
