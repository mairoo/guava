'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CartItem } from '@/types/cart';
import { formatKRW } from '@/utils';
import { Minus, Plus, X } from 'lucide-react';

interface Props {
  item: CartItem;
}

export const CartItemMobile = ({ item }: Props) => {
  return (
    <Card className="hover:bg-slate-50 transition-colors">
      <CardContent className="pt-6 p-3 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">{item.name} {item.subtitle}</span>
          <span className="text-sm">{formatKRW.format(item.price)}</span>
        </div>
        <div className="flex items-center border rounded-lg w-full">
          <button className="px-3 py-1 hover:bg-slate-100">
            <Minus size={16} className="text-slate-500" />
          </button>
          <span className="px-3 py-1 border-x flex-1 text-center">
            {item.quantity}
          </span>
          <button className="px-3 py-1 hover:bg-slate-100">
            <Plus size={16} className="text-slate-500" />
          </button>
          <button className="px-3 py-1 border-l hover:bg-slate-100">
            <X size={16} className="text-slate-500" />
          </button>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold">
            {formatKRW.format(item.price * item.quantity)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
