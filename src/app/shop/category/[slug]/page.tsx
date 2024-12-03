import { DottedList, FlexColumn } from '@/components/layout';
import { ProductGrid, ProductItemBuy } from '@/components/product';
import Link from 'next/link';
import React from 'react';

const bestsellers = [
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
];

const CategoryDetailPage = () => {
  return (
    <FlexColumn spacing={2} marginY={2}>
      <DottedList
        indent={2}
        border="border border-yellow-200"
        rounded={true}
        backgroundColor="bg-yellow-50"
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
      <ProductGrid gap={2} py={0}>
        {bestsellers.map((product) => (
          <Link
            key={product.id}
            href={`/shop/product/1/${product.name}`}
            className="block"
          >
            <ProductItemBuy
              name={product.name}
              discountRate={product.discountRate}
              price={3550}
              imageUrl={product.imageUrl}
            />
          </Link>
        ))}
      </ProductGrid>
    </FlexColumn>
  );
};

export default CategoryDetailPage;
