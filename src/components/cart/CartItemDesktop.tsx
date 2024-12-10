'use client';

import { removeItem, updateItemQuantity } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { CartItem } from '@/types/cart';
import { formatKRW } from '@/utils';
import { Minus, Plus, X } from 'lucide-react';

interface Props {
  item: CartItem;
}

export const CartItemDesktop = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta); // 최소 수량은 1
    dispatch(
      updateItemQuantity({
        productId: item.productId,
        quantity: newQuantity,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(removeItem(item.productId));
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-3 items-center hover:bg-slate-50 transition-colors">
      <div className="text-sm font-semibold">
        {item.name} {item.subtitle}
      </div>
      <div className="text-sm text-right">{formatKRW.format(item.price)}</div>
      <div className="text-sm text-center">
        <div className="inline-flex items-center border rounded-lg">
          <button
            className="px-3 py-1 hover:bg-slate-100"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus size={16} className="text-slate-500" />
          </button>
          <span className="px-3 py-1 border-x">{item.quantity}</span>
          <button
            className="px-3 py-1 hover:bg-slate-100"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus size={16} className="text-slate-500" />
          </button>
          <button
            className="px-3 py-1 border-l hover:bg-slate-100"
            onClick={handleRemove}
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>
      </div>
      <div className="text-sm font-semibold text-right">
        {formatKRW.format(item.price * item.quantity)}
      </div>
    </div>
  );
};
