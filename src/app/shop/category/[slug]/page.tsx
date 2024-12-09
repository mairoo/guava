'use client';

import { FlexColumn } from '@/components/layout';
import {
  ErrorMessage,
  InfoMessage,
  LoadingMessage,
  WarningMessage,
} from '@/components/message';
import { ProductGrid, ProductItemBuy } from '@/components/product';
import { Card } from '@/components/ui/card';
import { categories } from '@/data/categories';
import { toast } from '@/hooks/use-toast';
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
    return (
      <WarningMessage
        message="카테고리를 찾을 수 없습니다"
        description="요청하신 카테고리가 존재하지 않습니다. URL을 다시 확인해주세요."
      />
    );
  }

  if (isLoading) {
    return (
      <LoadingMessage
        message="로딩 중"
        description="상품 정보를 불러오고 있습니다. 잠시만 기다려주세요."
      />
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        message="상품을 불러오는데 실패했습니다"
        description="잠시 후 다시 시도해주세요. 문제가 지속되면 고객센터로 문의해주세요."
      />
    );
  }

  if (!response?.data) {
    return (
      <InfoMessage
        message="데이터가 없습니다"
        description="현재 이 카테고리에 등록된 상품이 없습니다."
      />
    );
  }

  const handleAddToCart = async (productId: number) => {
    console.log(productId);
    try {
      toast({
        title: '장바구니에 추가되었습니다',
        description: '장바구니에서 수량을 변경하실 수 있습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '장바구니 추가 실패',
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  };

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
              onAddToCart={async (e) => {
                e.stopPropagation();
                await handleAddToCart(product.id);
              }}
            />
          </Link>
        ))}
      </ProductGrid>
    </FlexColumn>
  );
};

export default CategoryDetailPage;
