'use client';

import {
  CartAgreements,
  CartItemDesktop,
  CartItemMobile,
} from '@/components/cart';
import { FlexColumn, TitledSection } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CART_ITEMS, PAYMENT_METHODS } from '@/data/cart';
import { formatKRW } from '@/utils';
import { useState } from 'react';

const CartPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

  const totalAmount = CART_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePaymentMethodChange = async (method: string) => {
    try {
      // await updatePaymentMethodAction(method);
      setPaymentMethod(method);
    } catch (error) {
      console.error('Failed to update payment method:', error);
      // 에러 처리 로직 추가 (예: 토스트 메시지)
    }
  };

  const handleOrderSubmit = async () => {
    try {
      // 주문 제출 로직 구현
      console.log('Order submitted');
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };

  const DesktopView = (
    <div className="hidden lg:block">
      <div className="divide-y">
        {CART_ITEMS.map((item) => (
          <CartItemDesktop key={item.id} item={item} />
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
      {CART_ITEMS.map((item) => (
        <CartItemMobile key={item.id} item={item} />
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

  const PaymentMethodsDesktopView = (
    <div className="hidden lg:block">
      <Card className="border-0 shadow-none">
        <CardContent className="pt-6 p-3">
          <RadioGroup
            value={paymentMethod}
            onValueChange={handlePaymentMethodChange}
            className="grid grid-cols-3 gap-4"
          >
            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} id={`desktop-${method.id}`} />
                <Label
                  htmlFor={`desktop-${method.id}`}
                  className="cursor-pointer"
                >
                  <span className="font-medium">{method.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );

  const PaymentMethodsMobileView = (
    <div className="lg:hidden">
      <Card>
        <CardContent className="pt-6 p-3">
          <RadioGroup
            value={paymentMethod}
            onValueChange={handlePaymentMethodChange}
            className="space-y-3"
          >
            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} id={`mobile-${method.id}`} />
                <Label
                  htmlFor={`mobile-${method.id}`}
                  className="cursor-pointer"
                >
                  <span className="font-medium">{method.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FlexColumn>
      <TitledSection title="장바구니 / 주문결제" showBorder>
        {DesktopView}
        {MobileView}
      </TitledSection>
      <TitledSection title="입금 / 결제수단" showBorder>
        {PaymentMethodsDesktopView}
        {PaymentMethodsMobileView}
      </TitledSection>
      <TitledSection title="주문 동의" showBorder>
        <CartAgreements onSubmit={handleOrderSubmit} />
      </TitledSection>
      <TitledSection title="주의사항" showBorder>
        <div>주문 전 확인사항 영역</div>
      </TitledSection>
    </FlexColumn>
  );
};

export default CartPage;
