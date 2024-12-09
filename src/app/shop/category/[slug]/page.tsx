'use client';

import { FlexColumn } from '@/components/layout';
import { ProductGrid, ProductItemBuy } from '@/components/product';
import { Card } from '@/components/ui/card';
import { products } from '@/data/products';
import { CategoryDetailParams } from '@/types/params';
import Link from 'next/link';
import React, { use } from 'react';
import ReactMarkdown from 'react-markdown';

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

const CategoryDetailPage = ({ params }: CategoryDetailParams) => {
  const resolvedParams = use(params);

  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const product = products.find((product) => product.slug === decodedSlug);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <FlexColumn spacing={2} marginY={2}>
      <Card className="w-full border border-yellow-200 bg-yellow-50 shadow-none p-1">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{product.description}</ReactMarkdown>
        </div>
      </Card>
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
