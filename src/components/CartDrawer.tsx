'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBag, X } from 'lucide-react';
import React from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onOpenChangeAction,
}) => {
  const cartItems = [
    {
      id: 1,
      name: '구글플레이 기프트카드 1만원',
      price: 10000,
      quantity: 2,
    },
    {
      id: 2,
      name: '구글플레이 기프트카드 3만원',
      price: 30000,
      quantity: 1,
    },
    {
      id: 3,
      name: '구글플레이 기프트카드 5만원',
      price: 50000,
      quantity: 1,
    },
    {
      id: 4,
      name: '넷플릭스 기프트카드 3개월',
      price: 45000,
      quantity: 2,
    },
    {
      id: 5,
      name: '플레이스테이션 기프트카드 5만원',
      price: 50000,
      quantity: 1,
    },
    {
      id: 6,
      name: '닌텐도 기프트카드 3만원',
      price: 30000,
      quantity: 3,
    },
    {
      id: 7,
      name: '아이튠즈 기프트카드 3만원',
      price: 30000,
      quantity: 2,
    },
    {
      id: 8,
      name: '로블록스 기프트카드 1만원',
      price: 10000,
      quantity: 4,
    },
  ];

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
          <div className="p-2 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-lg font-semibold">장바구니</h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="scale-150 transform origin-center rounded-full"
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
                    key={item.id}
                    className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.price.toLocaleString()}원 x {item.quantity}개
                      </div>
                    </div>
                    <div className="font-medium ml-4 text-right">
                      {(item.price * item.quantity).toLocaleString()}원
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

          {cartItems.length > 0 && (
            <div className="border-t p-4 sticky bottom-0 bg-white">
              <div className="flex justify-between mb-4">
                <span className="font-medium">총 상품금액</span>
                <span className="font-medium">
                  {cartItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toLocaleString()}
                  원
                </span>
              </div>
              <Button className="w-full">주문하기</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
