import {
  DottedList,
  FlexColumn,
  GridRow,
  GridRowTwoThirds,
  MessageTitleDateList,
  TitledSection,
} from '@/components/layout';
import { CategoryItem, ProductGrid } from '@/components/product';
import { categories } from '@/data/categories';

import React from 'react';

const noticeData = [
  {
    category: '일반',
    title: '휴대폰본인인증 오류 정상화',
    date: '2024.09.06',
    url: '/notices/1',
  },
  {
    category: '일반',
    title: '휴대폰인증 서비스 장애 안내',
    date: '2024.09.05',
    url: '/notices/2',
  },
  {
    category: '일반',
    title: '스타벅스 e카드 교환권 추가 안내',
    date: '2024.09.01',
    url: '/notices/3',
  },
  {
    category: '일반',
    title: '플레이스테이션 카드 재입고',
    date: '2024.08.27',
    url: '/notices/4',
  },
  {
    category: '일반',
    title: '페이팔 USD 결제가 인하',
    date: '2024.07.30',
    url: '/notices/5',
  },
];

const testimonialData = [
  {
    title: '5년째 잘 이용하고 있습니다',
    date: '2024.10.23',
    url: '/testimonials/1',
  },
  {
    title: '관리가 확실하며 답변이 빠르고 처리도 빠릅니다.',
    date: '2024.09.05',
    url: '/testimonials/2',
  },
  {
    title: '발송이 매우 빨라서 좋아요',
    date: '2024.08.08',
    url: '/testimonials/3',
  },
  {
    title: '문의가 바로 답변이오네요...',
    date: '2024.07.30',
    url: '/testimonials/4',
  },
  {
    title: '잘 사용하고 있습니다',
    date: '2024.07.30',
    url: '/testimonials/5',
  },
];

const Page = () => (
  <FlexColumn>
    <TitledSection title="오늘의 최저가 상품권">
      <ProductGrid gap={2} py={0}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            slug={category.slug}
            discountRate={category.discountRate}
            thumbnail={category.thumbnail}
          />
        ))}
      </ProductGrid>
    </TitledSection>

    <GridRowTwoThirds gap={4}>
      <TitledSection title="상품권 금융사기 예방수칙">
        <DottedList
          indent={2}
          /* border="border border-gray-200" rounded={true} backgroundColor="bg-gray-50"*/
        >
          <div>
            다른 사람으로부터 상품권 구매로 일부 또는 전체 금액을 입금 받기로
            했습니까?
          </div>
          <div>
            상품권 일부 또는 전체를 대리구매 하여 카카오톡 등 메신저로 다른
            사람에게 주기로 했습니까?
          </div>
          <div>
            네이트온/카카오톡 등 메신저에서 지인이 급한 돈이 필요하다고 상품권을
            요구했습니까?
          </div>
          <div>
            중고나라 또는 번개장터에서 물품대금을 현금 대신 상품권으로 요구
            받았습니까?
          </div>
        </DottedList>
      </TitledSection>
    </GridRowTwoThirds>
    <GridRow cols={2} gapX={8} gapY={0}>
      <TitledSection title="공지사항">
        <MessageTitleDateList messages={noticeData} />
      </TitledSection>
      <TitledSection title="이용후기">
        <MessageTitleDateList messages={testimonialData} />
      </TitledSection>
    </GridRow>
  </FlexColumn>
);
export default Page;
