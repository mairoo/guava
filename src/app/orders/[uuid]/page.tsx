'use client';

import { FlexColumn, GridRow, TitledSection } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { useGetMyOrderItemsQuery, useGetMyOrderQuery } from '@/store/order/api';
import { ORDER_STATUS, PAYMENT_METHODS } from '@/types/order';
import { formatDateTime, formatKRW } from '@/utils';
import { useParams } from 'next/navigation';

const OrderDetailPage = () => {
  const { uuid } = useParams();

  if (!uuid || Array.isArray(uuid)) return <div>잘못된 주문번호입니다.</div>;

  const {
    data: orderResponse,
    isLoading: orderLoading,
    error: orderError,
  } = useGetMyOrderQuery({
    uuid: uuid,
  });

  const {
    data: orderItemsResponse,
    isLoading: itemsLoading,
    error: itemsError,
  } = useGetMyOrderItemsQuery({
    uuid: uuid,
  });

  if (orderLoading || itemsLoading) return <div>로딩 중...</div>;
  if (orderError || itemsError)
    return <div>주문 정보를 불러오는데 실패했습니다.</div>;

  const { data: order } = orderResponse ?? {};
  if (!order) return null;

  const { data: orderItems } = orderItemsResponse ?? {};

  const giftCards = [
    {
      id: 1,
      name: '구글플레이기프트카드 5만원',
      pin: 'GOOG-1234-5678-9ABC',
      note: '123456',
    },
    {
      id: 2,
      name: '아이튠즈 기프트카드 3만원',
      pin: 'ITNS-DEFG-HIJK-LMNO',
      note: '123456',
    },
    {
      id: 3,
      name: '넷플릭스 기프트카드 10만원',
      pin: 'NFLX-PQRS-TUVW-XYZ1',
      note: '123456',
    },
    {
      id: 4,
      name: '플레이스테이션 기프트카드 5만원',
      pin: 'PSN-2345-6789-ABCD',
      note: '123456',
    },
    {
      id: 5,
      name: '닌텐도 기프트카드 3만원',
      pin: 'NTDO-EFGH-IJKL-MNOP',
      note: '123456',
    },
  ];

  return (
    <FlexColumn>
      <TitledSection title="주문 상세보기" showBorder>
        <GridRow cols={2} gapX={8} gapY={4}>
          <div>
            <div className="border md:border-0 rounded-lg p-6">
              <div className="flex gap-2">
                <div className="text-sm text-gray-600 min-w-[100px] shrink-0">
                  주문번호
                </div>
                <div className="text-sm">{order.orderNo}</div>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="text-sm text-gray-600 min-w-[100px] shrink-0">
                  주문상태
                </div>
                <div className="text-sm bg-green-50 text-green-700 border-green-200">
                  {ORDER_STATUS[order.status as keyof typeof ORDER_STATUS] ||
                    order.status}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="text-sm text-gray-600 min-w-[100px] shrink-0">
                  입금/결제수단
                </div>
                <div className="text-sm">
                  {PAYMENT_METHODS[
                    order.paymentMethod as keyof typeof PAYMENT_METHODS
                  ] || order.paymentMethod}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="text-sm text-gray-600 min-w-[100px] shrink-0">
                  주문일시
                </div>
                <div className="text-sm">{formatDateTime(order.created)}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="border md:border-0 rounded-lg">
              <div className="divide-y">
                {orderItems?.map((item, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-none rounded-none"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium">{item.name}</div>
                        <span className="text-sm">
                          {formatKRW.format(item.sellingPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                        <span>수량: {item.quantity}개</span>
                        <span>
                          {formatKRW.format(item.sellingPrice * item.quantity)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end items-center p-6">
                  <span className="text-sm font-medium">
                    합계금액: {formatKRW.format(order.totalSellingPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GridRow>
      </TitledSection>

      <TitledSection title="상품권 발송 내역" showBorder>
        <Card className="md:border-0 md:shadow-none">
          <CardContent className="px-6 py-2">
            <div className="divide-y">
              {giftCards.map((card) => (
                <div key={card.id} className="md:grid md:grid-cols-12">
                  <div className="text-sm py-3 col-span-3">{card.name}</div>
                  <div className="text-sm py-3 md:border-l font-mono col-span-9 md:pl-6">
                    {card.pin}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TitledSection>
    </FlexColumn>
  );
};

export default OrderDetailPage;
