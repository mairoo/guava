import { DottedList, FlexColumn, TitledSection } from '@/components/layout';
import { ProductGrid, ProductItem } from '@/components/product';

import React from 'react';

const products = [
  {
    id: 1,
    name: '한게임상품권',
    discountRate: 0.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 2,
    name: '구글기프트카드',
    discountRate: 4.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 3,
    name: '아프리카별풍선',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 4,
    name: '에그머니',
    discountRate: 9.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 5,
    name: '플레이스테이션',
    discountRate: 7.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 6,
    name: '틴캐시',
    discountRate: 7.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 7,
    name: '스마트문화상품권',
    discountRate: 6.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 8,
    name: '도서문화상품권',
    discountRate: 6.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 9,
    name: '컬쳐랜드상품권',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 10,
    name: '요기요',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 11,
    name: '스타벅스',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 12,
    name: '문화상품권',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 13,
    name: '넥슨카드',
    discountRate: 5.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 14,
    name: '퍼니카드',
    discountRate: 4.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 15,
    name: '와우캐시',
    discountRate: 2.15,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 16,
    name: '아이템베이선불쿠폰',
    discountRate: 2.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 17,
    name: '매니아선불쿠폰',
    discountRate: 2.0,
    imageUrl: 'https://placehold.co/170x100',
  },
  {
    id: 18,
    name: 'N코인',
    discountRate: 2.0,
    imageUrl: 'https://placehold.co/170x100',
  },
];

const Home = () => (
  <FlexColumn spacing={4}>
    <TitledSection title="오늘의 최저가 상품권">
      <ProductGrid gap={2} py={0}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            name={product.name}
            discountRate={product.discountRate}
            imageUrl={product.imageUrl} // 실제 이미지 URL로 교체 필요
          />
        ))}
      </ProductGrid>
    </TitledSection>

    <TitledSection title="상품권 금융사기 예방수칙">
      <DottedList indent={2}>
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
    <TitledSection title="상품권 금융사기 예방수칙">
      <DottedList
        indent={1.5}
        border="border border-gray-200"
        rounded={true}
        backgroundColor="bg-gray-50"
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
    <div>Third item</div>
  </FlexColumn>
);
export default Home;
