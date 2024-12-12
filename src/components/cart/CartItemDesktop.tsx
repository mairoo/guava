'use client';

import { useCartItemActions } from '@/hooks/useCartItemActions';
import { CartItem } from '@/types/cart';
import { formatKRW } from '@/utils';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

interface Props {
  item: CartItem;
}

export const CartItemDesktop = ({ item }: Props) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCartItemActions(
    { item },
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-3 items-center hover:bg-slate-50 transition-colors">
      <Link
        href={`/shop/product/${item.productId}/${item.code}`}
        className="text-sm font-semibold"
      >
        {item.name} {item.subtitle}
      </Link>
      <div className="text-sm text-right">{formatKRW.format(item.sellingPrice)}</div>
      <div className="text-sm text-center">
        <div className="inline-flex items-center border rounded-lg">
          <button
            className="px-3 py-1 hover:bg-slate-100"
            onClick={() => decreaseQuantity()}
          >
            <Minus size={16} className="text-slate-500" />
          </button>
          <span className="px-3 py-1 border-x">{item.quantity}</span>
          <button
            className="px-3 py-1 hover:bg-slate-100"
            onClick={() => increaseQuantity()}
          >
            <Plus size={16} className="text-slate-500" />
          </button>
          <button
            className="px-3 py-1 border-l hover:bg-slate-100"
            onClick={() => removeItem()}
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>
      </div>
      <div className="text-sm font-semibold text-right">
        {formatKRW.format(item.sellingPrice * item.quantity)}
      </div>
    </div>
  );
};
