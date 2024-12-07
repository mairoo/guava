'use client';

import { FlexColumn, TitledSection } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatKRW } from '@/utils';
import { Minus, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: '넥슨카드 5만원', price: 47500, quantity: 2 },
    { id: 2, name: '구글 5만원', price: 47500, quantity: 2 },
    { id: 3, name: '구글 5만원', price: 47500, quantity: 2 },
    { id: 4, name: '구글 5만원', price: 47500, quantity: 2 },
    { id: 5, name: '구글 5만원', price: 47500, quantity: 2 },
  ];

  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

  const paymentMethods = [
    {
      id: 'bank-transfer',
      name: '계좌이체/무통장입금',
    },
    {
      id: 'escrow',
      name: '에스크로',
    },
    {
      id: 'paypal',
      name: '페이팔',
    },
    {
      id: 'mobile',
      name: '휴대폰결제',
    },
    {
      id: 'card',
      name: '카드결제',
    },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const DesktopView = (
    <div className="hidden lg:block">
      <div className="divide-y">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 gap-4 p-3 items-center hover:bg-slate-50 transition-colors"
          >
            <div className="text-sm font-semibold">{item.name}</div>
            <div className="text-sm text-right">
              {formatKRW.format(item.price)}
            </div>
            <div className="text-sm text-center">
              <div className="inline-flex items-center border rounded-lg">
                <button className="px-3 py-1 hover:bg-slate-100">
                  <Minus size={16} className="text-slate-500" />
                </button>
                <span className="px-3 py-1 border-x">{item.quantity}</span>
                <button className="px-3 py-1 hover:bg-slate-100">
                  <Plus size={16} className="text-slate-500" />
                </button>
                <button className="px-3 py-1 border-l hover:bg-slate-100">
                  <X size={16} className="text-slate-500" />
                </button>
              </div>
            </div>
            <div className="text-sm font-semibold text-right">
              {formatKRW.format(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end p-3 bg-lime-50 rounded-b-lg">
        <div className="text-sm font-semibold">
          합계금액: {formatKRW.format(totalAmount)}
        </div>
      </div>
    </div>
  );

  const MobileView = (
    <div className="lg:hidden space-y-2">
      {cartItems.map((item) => (
        <Card key={item.id} className="hover:bg-slate-50 transition-colors">
          <CardContent className="pt-6 p-3">
            <div className="space-y-3">
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="flex justify-between items-center">
                <span className="text-sm">단가</span>
                <span className="text-sm">{formatKRW.format(item.price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">수량</span>
                <div className="inline-flex items-center border rounded-lg">
                  <button className="px-3 py-1 hover:bg-slate-100">
                    <Minus size={16} className="text-slate-500" />
                  </button>
                  <span className="px-3 py-1 border-x">{item.quantity}</span>
                  <button className="px-3 py-1 hover:bg-slate-100">
                    <Plus size={16} className="text-slate-500" />
                  </button>
                  <button className="px-3 py-1 border-l hover:bg-slate-100">
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">부분합계</span>
                <span className="text-sm font-semibold">
                  {formatKRW.format(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="bg-lime-50">
        <CardContent className="pt-6 p-3">
          <div className="flex justify-between items-center text-sm font-bold">
            <span>합계금액</span>
            <span>{formatKRW.format(totalAmount)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FlexColumn>
      <TitledSection title="장바구니 / 주문결제">
        {DesktopView}
        {MobileView}
      </TitledSection>
      <TitledSection title="입금 / 결제수단">
        <Card className="md:border-0 md:shadow-none">
          <CardContent className="pt-6 p-3">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-3"
            >
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label
                    htmlFor={method.id}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-medium">{method.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </TitledSection>
      <TitledSection title="주의사항">
        <div>주문 전 확인사항 영역</div>
      </TitledSection>
    </FlexColumn>
  );
};

export default CartPage;
