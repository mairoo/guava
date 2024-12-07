import {
  FlexColumn,
  FlexRow,
  GridRow,
  TitledSection,
} from '@/components/layout';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Info, LinkIcon } from 'lucide-react';
import React from 'react';

const OrderListPage = () => {
  const orders = [
    {
      id: 'e3d12d89-1234-5678-90ab-cdef01234567',
      status: '입금확인중',
      paymentMethod: '계좌이체/무통장입금',
      orderDate: '2024-12-07 20:52',
      totalAmount: 91000,
    },
    {
      id: 'f4e23e90-2345-6789-01bc-defa12345678',
      status: '발송완료',
      paymentMethod: '카드결제',
      orderDate: '2024-12-07 19:30',
      totalAmount: 128000,
    },
  ];

  // UUID를 짧게 표시하는 함수
  const truncateUUID = (uuid: string) => {
    return uuid.substring(0, 7) + '...';
  };

  // 금액 포맷팅 함수
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      currencyDisplay: 'symbol',
    }).format(amount);
  };

  const logins = [
    {
      id: '1',
      date: '2024년 12월 5일',
      time: '오후 5:40',
      device: '데스크톱',
      location: '서울',
    },
    {
      id: '2',
      date: '2024년 10월 6일',
      time: '오후 3:51',
      device: '모바일',
      location: '부산',
    },
  ];

  const inquiries = [
    {
      id: '1',
      status: '답변완료',
      category: '입금/결제',
      orderId: 'e3d12d89',
      date: '2024년 12월 5일',
      time: '오후 5:40',
      title: '결제 확인 부탁드립니다',
    },
    {
      id: '2',
      status: '답변대기',
      category: '회원가입',
      orderId: null,
      date: '2024년 10월 6일',
      time: '오후 3:51',
      title: '본인인증 오류 관련 문의드립니다',
    },
  ];

  return (
    <>
      <FlexColumn spacing={2}>
        <TitledSection title="주문 및 발송 내역">
          {/* 데스크톱 뷰 */}
          <div className="hidden lg:block">
            {/* 헤더 */}
            <div className="grid grid-cols-5 gap-4 p-4 bg-slate-50 border-y font-medium">
              <div className="text-sm text-slate-600">주문번호</div>
              <div className="text-sm text-slate-600">주문상태</div>
              <div className="text-sm text-slate-600">입금/결제수단</div>
              <div className="text-sm text-slate-600">주문일시</div>
              <div className="text-sm text-slate-600 text-right">합계금액</div>
            </div>

            {/* 주문 목록 */}
            <div className="divide-y">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
                >
                  <div className="font-mono text-sm">
                    {truncateUUID(order.id)}
                  </div>
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

          {/* 모바일 뷰 */}
          <div className="lg:hidden space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="font-mono text-sm">
                      {truncateUUID(order.id)}
                    </div>

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

          <div className="flex items-center gap-2 mt-1 p-3 bg-slate-50 rounded-md border border-slate-200">
            <Info className="h-4 w-4 text-slate-500 flex-shrink-0" />
            <span className="text-sm text-slate-600">
              신용카드/휴대폰 결제 구매내역은 카드몰 주문/발송 페이지에서 확인
              가능합니다.
            </span>
          </div>
        </TitledSection>
        <GridRow cols={2} gap={4}>
          <TitledSection title="최근 로그인 이력">
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md border border-slate-200">
                <Info className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <span className="text-sm text-slate-600">
                  수상한 접속이 있는 경우 즉시 비밀번호를 변경하시고 고객센터에
                  알려주세요.
                </span>
              </div>

              {/* 데스크톱 뷰 */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 border-y font-medium">
                  <div className="text-sm text-slate-600">접속일자</div>
                  <div className="text-sm text-slate-600">접속시간</div>
                  <div className="text-sm text-slate-600">접속기기</div>
                  <div className="text-sm text-slate-600">접속위치</div>
                </div>

                <div className="divide-y">
                  {logins.map((login) => (
                    <div
                      key={login.id}
                      className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-sm">{login.date}</div>
                      <div className="text-sm">{login.time}</div>
                      <div className="text-sm">{login.device}</div>
                      <div className="text-sm">{login.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 모바일 뷰 */}
              <div className="lg:hidden space-y-4">
                {logins.map((login) => (
                  <div
                    key={login.id}
                    className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{login.date}</span>
                        <span className="text-sm">{login.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          {login.device}
                        </span>
                        <span className="text-sm text-slate-600">
                          {login.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TitledSection>
          <TitledSection title="최근 문의 내역">
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md border border-slate-200">
                <Info className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <span className="text-sm text-slate-600">
                  고객센터 운영 시간: 매일 오전 10시~밤 11시
                </span>
              </div>

              {/* 데스크톱 뷰 */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-5 gap-4 p-4 bg-slate-50 border-y font-medium">
                  <div className="text-sm text-slate-600">답변상태</div>
                  <div className="text-sm text-slate-600">문의유형</div>
                  <div className="text-sm text-slate-600">관련주문</div>
                  <div className="text-sm text-slate-600">문의일시</div>
                  <div className="text-sm text-slate-600">제목</div>
                </div>

                <div className="divide-y">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-sm">
                        <span
                          className={
                            inquiry.status === '답변완료'
                              ? 'text-green-600'
                              : 'text-orange-600'
                          }
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="text-sm">{inquiry.category}</div>
                      <div className="text-sm">
                        {inquiry.orderId ? (
                          <div className="flex items-center gap-1">
                            <span className="font-mono">{inquiry.orderId}</span>
                            <LinkIcon className="h-3 w-3 text-slate-400" />
                          </div>
                        ) : (
                          '-'
                        )}
                      </div>
                      <div className="text-sm">{`${inquiry.date} ${inquiry.time}`}</div>
                      <div className="text-sm font-medium">{inquiry.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 모바일 뷰 */}
              <div className="lg:hidden space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-sm ${inquiry.status === '답변완료' ? 'text-green-600' : 'text-orange-600'}`}
                        >
                          {inquiry.status}
                        </span>
                        <span className="text-sm">{inquiry.category}</span>
                      </div>

                      <div className="text-sm font-medium">{inquiry.title}</div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">{`${inquiry.date} ${inquiry.time}`}</span>
                        {inquiry.orderId && (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <span className="font-mono">{inquiry.orderId}</span>
                            <LinkIcon className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TitledSection>
        </GridRow>
        <FlexRow className="justify-center mt-6" spacing={2}>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">1</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </FlexRow>
      </FlexColumn>
    </>
  );
};

export default OrderListPage;
