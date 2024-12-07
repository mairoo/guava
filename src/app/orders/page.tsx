import { Pagination } from '@/components/common';
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
      datetime: '2024-12-05 17:40:00',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ip: '123.45.67.89',
    },
    {
      id: '2',
      datetime: '2024-10-06 15:51:00',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
      ip: '98.76.54.32',
    },
  ];

  const inquiries = [
    {
      id: '1',
      status: '답변완료',
      category: '입금/결제',
      orderId: 'e3d12d89',
      datetime: '2024-12-05 17:40:00',
      title: '결제 확인 부탁드립니다',
    },
    {
      id: '2',
      status: '답변대기',
      category: '회원가입',
      orderId: null,
      datetime: '2024-10-06 15:51:00',
      title: '본인인증 오류 관련 문의드립니다',
    },
  ];

  return (
    <FlexColumn spacing={2}>
      <TitledSection title="주문 및 발송 내역">
        <OrderList orders={orders} />
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
