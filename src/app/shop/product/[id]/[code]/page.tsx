import { Breadcrumbs, FlexColumn } from '@/components/layout';

import { ProductGrid, ProductItemBuy } from '@/components/product';
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

const breadcrumbItems = [
  { text: '홈', url: '/' },
  { text: '상품', url: '/products' },
  { text: '구글기프트카드' },
];

const ProductDetailPage = () => {
  return (
    <FlexColumn spacing={2}>
      <Breadcrumbs items={breadcrumbItems} marginTop={2} marginLeft={1} />
      <ProductGrid gap={2} py={0}>
        {bestsellers.map((product) => (
          <ProductItemBuy
            key={product.id}
            name={product.name}
            discountRate={product.discountRate}
            price={3550}
            imageUrl={product.imageUrl} // 실제 이미지 URL로 교체 필요
          />
        ))}
      </ProductGrid>
    </FlexColumn>
  );
};

export default ProductDetailPage;
