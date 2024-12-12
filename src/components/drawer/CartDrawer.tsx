'use client';

import { CartItemRow } from '@/components/drawer/CartItemRow';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAppSelector } from '@/store/hooks';
import { formatKRW } from '@/utils';
import { ShoppingBag, X } from 'lucide-react';
import React from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export const CartDrawer = ({ isOpen, onOpenChangeAction }: CartDrawerProps) => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0,
  );

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <button className="p-2" onClick={() => onOpenChangeAction(true)}>
        <ShoppingBag className="w-6 h-6 text-gray-700" />
      </button>
      <Sheet open={isOpen} onOpenChange={onOpenChangeAction} modal={false}>
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
                    <CartItemRow
                      key={item.productId}
                      item={item}
                      onOpenChangeAction={onOpenChangeAction}
                    />
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
    </>
  );
};
