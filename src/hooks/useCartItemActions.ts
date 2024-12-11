import { toast } from '@/hooks/use-toast';
import { useCartActions } from '@/hooks/useCartActions';
import { addItem } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { CartItem } from '@/types/cart';
import { ChangeEvent, useState } from 'react';

interface UseCartItemActionsProps {
  item?: CartItem;
  product?: {
    id: number;
    name: string;
    subtitle: string;
    code: string;
    sellingPrice: number;
  };
  initialQuantity?: number;
}

export const useCartItemActions = ({
  item,
  product,
  initialQuantity = 1,
}: UseCartItemActionsProps = {}) => {
  const dispatch = useAppDispatch();
  const { handleQuantityChange: syncQuantityChange, handleRemove } =
    useCartActions();
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    if (item) {
      syncQuantityChange(item.productId, 1, item.quantity);
    } else if (product) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (item) {
      syncQuantityChange(item.productId, -1, item.quantity);
    } else if (quantity > 1) {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 이름 변경
    const newQuantity = parseInt(e.target.value) || 1;
    const validQuantity = Math.max(1, newQuantity);

    if (item) {
      const delta = validQuantity - item.quantity;
      syncQuantityChange(item.productId, delta, item.quantity);
    } else {
      setQuantity(validQuantity);
    }
  };

  const removeItem = () => {
    if (item) {
      handleRemove(item.productId);
    }
  };

  const addToCart = async () => {
    if (!product) return;

    try {
      const cartItem: CartItem = {
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle || '',
        code: product.code,
        price: product.sellingPrice,
        quantity: quantity,
      };

      dispatch(addItem(cartItem));

      toast({
        title: `${product.name} ${product.subtitle || ''}`,
        description: '장바구니에 담았습니다.',
        duration: 1500,
        className: 'bg-white border border-gray-200 shadow-lg',
      });

      setQuantity(1);
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      toast({
        variant: 'destructive',
        title: '장바구니 추가 실패',
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  };

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange, // 이름 변경
    removeItem,
    addToCart,
  };
};
