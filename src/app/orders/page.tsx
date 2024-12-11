'use client';

import { Pagination } from '@/components/common';
import { FlexColumn, GridRow, TitledSection } from '@/components/layout';
import { InquiryList, LoginHistory, OrderList } from '@/components/order';
import { useGetMyOrdersQuery } from '@/store/order/api';
import React, { useState } from 'react';

const OrderListPage = () => {
  const [page, setPage] = useState(0);
  const {
    data: orderData,
    isLoading,
    error,
  } = useGetMyOrdersQuery({
    page,
    size: 20,
  });

  const orders = orderData?.data.content ?? [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
    <FlexColumn>
      <TitledSection title="주문 및 발송 내역" showBorder>
        {isLoading ? (
          <div>로딩 중...</div>
        ) : error ? (
          <div>주문 내역을 불러오는데 실패했습니다.</div>
        ) : (
          <>
            <OrderList orders={orders} />
            <Pagination
              page={page}
              totalPages={orderData?.data.totalPages ?? 0}
              onChange={handlePageChange}
            />
          </>
        )}
      </TitledSection>

      <GridRow cols={2} gapX={8} gapY={0}>
        <TitledSection title="최근 로그인 이력" showBorder>
          <LoginHistory logins={logins} />
        </TitledSection>
        <TitledSection title="최근 문의 내역" showBorder>
          <InquiryList inquiries={inquiries} />
        </TitledSection>
      </GridRow>
    </FlexColumn>
  );
};

export default OrderListPage;
