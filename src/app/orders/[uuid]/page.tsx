'use client';

import { FlexColumn, GridRow, TitledSection } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { formatDateTime, formatKRW } from '@/utils';

const OrderDetailPage = () => {
  const orderResponse = {
    timestamp: 1734008181404,
    status: 200,
    message: 'Success',
    data: {
      id: 1316653,
      orderNo: 'e21da6c346604df7bdd68d8fddf0b171',
      fullname: '서종화',
      totalListPrice: 15000.0,
      totalSellingPrice: 13950.0,
      currency: 'KRW',
      status: 'PAYMENT_PENDING',
      paymentMethod: 'PAYPAL',
      created: '2024-12-12T21:20:38.055635',
      modified: '2024-12-12T21:20:38.055635',
      suspicious: false,
      removed: false,
    },
  };

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

  const { data: order } = orderResponse;

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
                  발송완료
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="text-sm text-gray-600 min-w-[100px] shrink-0">
                  입금/결제수단
                </div>
                <div className="text-sm">계좌이체 / 무통장입금</div>
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
                <Card className="border-0 shadow-none rounded-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">상품권 A</div>
                      <span className="text-sm">{formatKRW.format(13950)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                      <span>수량: 1개</span>
                      <span>{formatKRW.format(13950)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-none rounded-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">상품권 A</div>
                      <span className="text-sm">{formatKRW.format(13950)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                      <span>수량: 1개</span>
                      <span>{formatKRW.format(13950)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-none rounded-none">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">
                        구글기프트카드 10만원
                      </div>
                      <span className="text-sm">{formatKRW.format(13950)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mt-3">
                      <span>수량: 10000개</span>
                      <span>{formatKRW.format(13950999)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end items-center p-6">
                  <span className="text-sm font-medium">
                    합계금액: {formatKRW.format(13978899)}
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
