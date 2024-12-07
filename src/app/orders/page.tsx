import { InfoAlert, Pagination } from '@/components/common';
import { FlexColumn, GridRow, TitledSection } from '@/components/layout';
import { InquiryList, LoginHistory, OrderList } from '@/components/order';

import React from 'react';

const OrderListPage = () => {
  const orders = [
    {
      id: 'e3d12d89-1234-5678-90ab-cdef01234567',
      status: '입금확인중',
      paymentMethod: '계좌이체/무통장입금',
      orderDate: '2024-12-07 20:52',
      totalAmount: 91000,
      url: '/orders/e3d12d89-1234-5678-90ab',
    },
    {
      id: 'f4e23e90-2345-6789-01bc-defa12345678',
      status: '발송완료',
      paymentMethod: '카드결제',
      orderDate: '2024-12-07 19:30',
      totalAmount: 128000,
      url: '/orders/f4e23e90-2345-6789-01bc-defa12345678',
    },
  ];

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
    <FlexColumn spacing={2}>
      <TitledSection title="주문 및 발송 내역">
        <OrderList orders={orders} />
        <InfoAlert>
          신용카드/휴대폰 결제 구매내역은 카드몰 주문/발송 페이지에서 확인
          가능합니다.
        </InfoAlert>
      </TitledSection>

      <GridRow cols={2} gap={4}>
        <TitledSection title="최근 로그인 이력">
          <LoginHistory logins={logins} />
        </TitledSection>
        <TitledSection title="최근 문의 내역">
          <InquiryList inquiries={inquiries} />
        </TitledSection>
      </GridRow>

      <Pagination />
    </FlexColumn>
  );
};

export default OrderListPage;
