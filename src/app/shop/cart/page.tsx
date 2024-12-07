// pages/CartPage.tsx
'use client';

import { CartItemDesktop } from '@/components/cart/CartItemDesktop';
import { CartItemMobile } from '@/components/cart/CartItemMobile';
import { PaymentMethods } from '@/components/cart/PaymentMethods';
import { FlexColumn, TitledSection } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
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

  return (
    <FlexColumn>
      <TitledSection title="장바구니 / 주문결제">
        {DesktopView}
        {MobileView}
      </TitledSection>
      <TitledSection title="입금 / 결제수단">
        <PaymentMethods
          methods={PAYMENT_METHODS}
          selectedMethod={paymentMethod}
          onMethodChangeAction={handlePaymentMethodChange}
        />
      </TitledSection>
      <TitledSection title="주의사항">
        <div>주문 전 확인사항 영역</div>
      </TitledSection>
    </FlexColumn>
  );
};

export default CartPage;
