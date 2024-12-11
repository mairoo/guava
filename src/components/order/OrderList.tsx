import { InfoAlert, TableHeader } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Orders } from '@/types/order';
import { formatDateTime, formatKRW, truncateUUID } from '@/utils';
import { translateOrderStatus, translatePaymentMethod } from '@/utils/orders';
import Link from 'next/link';
import React from 'react';

export const OrderList = ({ orders }: { orders: Orders.Order[] }) => {
  const DesktopView = (
    <div className="hidden lg:block">
      <TableHeader
        columns={[
          '주문번호',
          '주문상태',
          '입금/결제수단',
          '주문일시',
          '합계금액',
        ]}
      />
      <div className="divide-y">
        {orders.map((order) => (
          <div key={order.id}>
            <Link href={`/orders/${order.orderNo}`}>
              <div className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="font-mono text-sm">
                  {truncateUUID(order.orderNo)}
                </div>
                <div className="text-sm">
                  {translateOrderStatus(order.status)}
                </div>
                <div className="text-sm">
                  {translatePaymentMethod(order.paymentMethod)}
                </div>
                <div className="text-sm">{formatDateTime(order.created)}</div>
                <div className="text-sm font-semibold text-right">
                  {formatKRW.format(order.totalSellingPrice)}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileView = (
    <div className="lg:hidden space-y-2">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.orderNo}`}
          className="block"
        >
          <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
            <CardContent className="pt-6 p-3">
              <div className="space-y-3">
                <div className="font-mono text-sm">
                  {truncateUUID(order.orderNo)}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{translatePaymentMethod(order.paymentMethod)}</span>
                  <span>{translateOrderStatus(order.status)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{formatDateTime(order.created)}</span>
                  <span className="font-semibold">
                    {formatKRW.format(order.totalSellingPrice)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="space-y-2">
      {DesktopView}
      {MobileView}
      <InfoAlert>
        신용카드/휴대폰 결제 구매내역은 카드몰 주문/발송 페이지에서 확인
        가능합니다.
      </InfoAlert>
    </div>
  );
};
