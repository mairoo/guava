import { TableHeader } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Order } from '@/types/order';

const truncateUUID = (uuid: string) => uuid.substring(0, 7) + '...';

const formatAmount = (amount: number) =>
  new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    currencyDisplay: 'symbol',
  }).format(amount);

export const OrderList = ({ orders }: { orders: Order[] }) => {
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
          <div
            key={order.id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
          >
            <div className="font-mono text-sm">{truncateUUID(order.id)}</div>
            <div className="text-sm">{order.status}</div>
            <div className="text-sm">{order.paymentMethod}</div>
            <div className="text-sm">{order.orderDate}</div>
            <div className="text-sm font-semibold text-right">
              {formatAmount(order.totalAmount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileView = (
    <div className="lg:hidden space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:bg-slate-50 transition-colors">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="font-mono text-sm">{truncateUUID(order.id)}</div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{order.paymentMethod}</span>
                <span className="text-sm">{order.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{order.orderDate}</span>
                <span className="text-sm font-semibold">
                  {formatAmount(order.totalAmount)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      {DesktopView}
      {MobileView}
    </>
  );
};
