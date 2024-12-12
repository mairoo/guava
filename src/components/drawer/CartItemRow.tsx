'use client';

import { Button } from '@/components/ui/button';
import { useCartItemActions } from '@/hooks/useCartItemActions';
import { CartItem } from '@/types/cart';
import { formatKRW } from '@/utils';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CartItemRowProps {
  item: CartItem;
  onOpenChangeAction: (open: boolean) => void;
}

export const CartItemRow = ({ item, onOpenChangeAction }: CartItemRowProps) => {
  const { removeItem } = useCartItemActions({ item });

  return (
    <div className="flex items-center justify-between px-3 py-3 border-b last:border-b-0">
      <div className="flex-1">
        <Link
          href={`/shop/product/${item.productId}/${item.code}`}
          className="font-medium"
          onClick={() => onOpenChangeAction(false)}
        >
          {item.name}
          <br /> {item.subtitle}
        </Link>
        <div className="text-sm text-gray-500 mt-1">
          {formatKRW.format(item.sellingPrice)} x {item.quantity}개
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="font-medium text-right">
          {formatKRW.format(item.sellingPrice * item.quantity)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-600"
          onClick={removeItem}
        >
          <Trash2 className="w-4 h-4" />
          <span className="sr-only">상품 삭제</span>
        </Button>
      </div>
    </div>
  );
};
