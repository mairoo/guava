'use client';

import { FlexColumn } from '@/components/layout';
import { ProductGrid, ProductItemBuy } from '@/components/product';
import { Card } from '@/components/ui/card';
import { categories } from '@/data/categories';
import { useGetProductsQuery } from '@/store/products/api';
import { CategoryDetailParams } from '@/types/params';
import Link from 'next/link';
import React, { use } from 'react';
import ReactMarkdown from 'react-markdown';

const CategoryDetailPage = ({ params }: CategoryDetailParams) => {
  const resolvedParams = use(params);

  const categorySlug = decodeURIComponent(resolvedParams.slug);

  const category = categories.find((c) => c.slug === categorySlug);

  const {
    data: response,
    isLoading,
    isError,
  } = useGetProductsQuery({ categorySlug });

  if (!category) {
    return <div>카테고리를 찾을 수 없습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>상품을 불러오는데 실패했습니다.</div>;
  }

  if (!response?.data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <FlexColumn spacing={2} marginY={2}>
      <Card className="w-full border border-yellow-200 bg-yellow-50 shadow-none p-1">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{category.description}</ReactMarkdown>
        </div>
      </Card>
      <ProductGrid gap={2} py={0}>
        {response.data.map((product) => (
          <Link
            key={product.id}
            href={`/shop/product/${product.id}/${product.name}`}
            className="block"
          >
            <ProductItemBuy
              name={product.name}
              subtitle={product.subtitle}
              discountRate={
                ((product.listPrice - product.sellingPrice) /
                  product.listPrice) *
                100
              }
              price={product.sellingPrice}
              imageUrl={category.imageUrl}
            />
          </Link>
        ))}
      </ProductGrid>
    </FlexColumn>
  );
};

export default CategoryDetailPage;
