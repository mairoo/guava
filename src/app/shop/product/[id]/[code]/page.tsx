'use client';

import { Breadcrumbs, FlexColumn } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { categories } from '@/data/categories';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGetProductQuery } from '@/store/products/api';

import { ProductDetailParams } from '@/types/params';
import { Products } from '@/types/product';
import { formatKRW } from '@/utils';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, use, useState } from 'react';
import ReactMarkdown from 'react-markdown'; // 상수 정의

// 상수 정의
const MINIMUM_QUANTITY = 1;

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 상품 이미지 컴포넌트
 */
const ProductImage = ({ imageUrl }: { imageUrl?: string }) => (
  <div className="w-full relative aspect-[170/100]">
    <Image
      src={imageUrl || '/placeholders/170x100.svg'}
      alt="Product placeholder"
      fill
      sizes="100vw"
      className="object-contain"
      priority
    />
  </div>
);

/**
 * 상품 정보 (가격, 할인율 등) 컴포넌트
 */
interface ProductInfoProps {
  product?: Products.Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => (
  <div className="space-y-2">
    <h2 className="text-lg font-bold">
      {product?.name || '상품 이름'} {product?.subtitle || '상품 가격'}
    </h2>
    <p className="text-sm text-gray-600">
      정가:{' '}
      <span className="line-through">
        {formatKRW.format(product?.listPrice || 0)}
      </span>
    </p>
    <p className="text-sm text-gray-600">
      판매가 {formatKRW.format(product?.sellingPrice || 0)}
    </p>
    {product && (
      <div className="text-sm text-gray-600 flex items-center gap-1">
        할인율{' '}
        <span className="text-red-500">
          {(
            ((product.listPrice - product.sellingPrice) / product.listPrice) *
            100
          ).toFixed(2)}
        </span>
        <span className="text-red-500">%</span>
        <ArrowDown className="w-4 h-4 text-red-500" />
      </div>
    )}
  </div>
);

/**
 * 상품 상세 설명 컴포넌트
 */
const ProductDescription = ({ description }: { description: string }) => (
  <Card className="w-full border-0 shadow-none">
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  </Card>
);

/**
 * 수량 선택 컴포넌트
 */
const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
}: QuantitySelectorProps) => (
  <div className="space-y-2 w-full">
    <div className="text-sm">수량</div>
    <div className="w-full flex [&>*:not(:first-child)]:border-l-0">
      <Button
        variant="outline"
        className="rounded-r-none px-4"
        onClick={onDecrement}
      >
        -
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={onChange}
        className="text-center rounded-none w-full"
        min={MINIMUM_QUANTITY}
      />
      <Button
        variant="outline"
        className="rounded-l-none px-4"
        onClick={onIncrement}
      >
        +
      </Button>
    </div>
    <Button
      variant="outline"
      size="sm"
      className="w-full border-gray-900 text-gray-900 hover:bg-white"
    >
      <ShoppingCart className="w-4 h-4" />
      담기
    </Button>
  </div>
);

/**
 * 상품 상세 페이지 컴포넌트
 */
const ProductDetailPage = ({ params }: ProductDetailParams) => {
  // URL 파라미터 처리
  const resolvedParams = use(params);
  const id = parseInt(decodeURIComponent(resolvedParams.id));

  // 상품 정보 조회
  const {
    data: productResponse,
    isLoading,
    error,
  } = useGetProductQuery({ id });
  const product = productResponse?.data;

  // 카테고리 정보 조회
  const category = product
    ? categories.find((c) => c.id === product.categoryId)
    : undefined;

  // 상태 관리
  const [quantity, setQuantity] = useState(MINIMUM_QUANTITY);
  const { matches: isDesktop } = useMediaQuery('(min-width: 1280px)');

  // 이벤트 핸들러
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => Math.max(MINIMUM_QUANTITY, prev - 1));
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || MINIMUM_QUANTITY;
    setQuantity(Math.max(MINIMUM_QUANTITY, value));
  };

  // breadcrumb 아이템 동적 생성
  const breadcrumbItems = [
    { text: '홈', url: '/' },
    { text: '상품', url: '/products' },
    {
      text: category?.title || '상품',
      url: category ? `/categories/${category.slug}` : undefined,
    },
  ];

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  const productImage = <ProductImage imageUrl={category?.imageUrl} />;
  const productInfo = <ProductInfo product={product} />;
  const quantitySelector = (
    <QuantitySelector
      quantity={quantity}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onChange={handleQuantityChange}
    />
  );
  const productDescription = category && (
    <ProductDescription description={category.description1} />
  );

  return (
    <FlexColumn spacing={2} marginY={2} className="w-full">
      <Breadcrumbs items={breadcrumbItems} marginY={1} />
      {isDesktop ? (
        <div className="grid grid-cols-[2fr,1fr] gap-8 w-full">
          {productDescription}
          <div className="space-y-8 w-full">
            {productImage}
            {productInfo}
            {quantitySelector}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {productImage}
          {productInfo}
          {quantitySelector}
          {productDescription}
        </div>
      )}
    </FlexColumn>
  );
};

export default ProductDetailPage;
