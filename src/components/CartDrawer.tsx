'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCartActions } from '@/hooks/useCartActions';
import { useAppSelector } from '@/store/hooks';
import { formatKRW } from '@/utils';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export const CartDrawer = ({ isOpen, onOpenChangeAction }: CartDrawerProps) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const { handleRemove } = useCartActions();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChangeAction} modal={false}>
      <SheetTrigger asChild>
        <button className="p-2">
          <ShoppingBag className="w-6 h-6 text-gray-700" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] p-0 border-l shadow-lg !pl-0 overflow-hidden [&>button]:hidden"
      >
        <div className="flex flex-col h-full bg-white">
          <div className="relative border-b">
            <SheetTitle className="sr-only">장바구니</SheetTitle>
            <SheetDescription className="sr-only">
              장바구니에 담긴 상품들을 확인하고 주문할 수 있습니다.
            </SheetDescription>
            <h2 className="h-14 flex items-center px-4 text-lg font-semibold bg-green-50 text-lime-600">
              장바구니
            </h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
              >
                <X className="w-6 h-6 text-gray-700" />
              </Button>
            </SheetClose>
          </div>

          <div
            className="flex-1 overflow-y-auto overscroll-contain"
            onScroll={handleScroll}
            style={{
              WebkitOverflowScrolling: 'touch',
              isolation: 'isolate',
            }}
          >
            {cartItems.length > 0 ? (
              <div className="py-2">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between px-3 py-3 border-b last:border-b-0"
                  >
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
                        {formatKRW.format(item.price)} x {item.quantity}개
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-right">
                        {formatKRW.format(item.price * item.quantity)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 hover:text-pink-600"
                        onClick={() => handleRemove(item.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">상품 삭제</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                장바구니가 비어있습니다
              </div>
            )}
          </div>

          <div className="border-t">
            <h2 className="h-14 flex items-center justify-between px-4 text-lg font-semibold bg-green-50 text-lime-600">
              <span>총 상품금액</span>
              <span>{formatKRW.format(totalAmount)}</span>
            </h2>
            <div className="p-4">
              <Button
                variant="outline"
                disabled={cartItems.length === 0}
                className="w-full bg-white hover:bg-gray-50"
              >
                주문하기
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
