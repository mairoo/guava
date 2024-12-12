import { CartItem } from '@/types/cart';
import { ChangeEvent, useState } from 'react';
import { useCartActions } from './useCartActions';

interface UseCartItemActionsProps {
  item?: CartItem;
  product?: {
    id: number;
    name: string;
    subtitle: string;
    code: string;
    listPrice: number;
    sellingPrice: number;
  };
  initialQuantity?: number;
}

/**
 * 장바구니 아이템 UI 동작을 관리하는 훅
 * 수량 변경, 아이템 추가/제거 등의 UI 레벨 동작 처리
 */
export const useCartItemActions = ({
  item,
  product,
  initialQuantity = 1,
}: UseCartItemActionsProps = {}) => {
  const { handleQuantityChange, handleRemove, handleAddToCart } =
    useCartActions();
  const [quantity, setQuantity] = useState(initialQuantity);

  /**
   * 수량 증가 처리
   */
  const increaseQuantity = () => {
    if (item) {
      handleQuantityChange(item.productId, 1, item.quantity);
    } else if (product) {
      setQuantity((prev) => prev + 1);
    }
  };

  /**
   * 수량 감소 처리
   */
  const decreaseQuantity = () => {
    if (item) {
      handleQuantityChange(item.productId, -1, item.quantity);
    } else if (quantity > 1) {
      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  /**
   * 수량 직접 변경 처리
   */
  const changeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 1;
    const validQuantity = Math.max(1, newQuantity);

    if (item) {
      const delta = validQuantity - item.quantity;
      handleQuantityChange(item.productId, delta, item.quantity);
    } else {
      setQuantity(validQuantity);
    }
  };

  /**
   * 장바구니 아이템 제거
   */
  const removeCartItem = () => {
    if (item) {
      handleRemove(item.productId);
    }
  };

  /**
   * 장바구니에 새 아이템 추가
   */
  const addToCart = async () => {
    if (!product) return;

    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle || '',
      code: product.code,
      listPrice: product.listPrice,
      sellingPrice: product.sellingPrice,
      quantity: quantity,
    };

    await handleAddToCart(cartItem);
    setQuantity(1); // 추가 후 수량 초기화
  };

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    changeQuantity,
    removeItem: removeCartItem,
    addToCart,
  };
};
