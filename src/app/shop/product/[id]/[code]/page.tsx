'use client';

import { Breadcrumbs, FlexColumn } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';

const breadcrumbItems = [
  { text: '홈', url: '/' },
  { text: '상품', url: '/products' },
  { text: '구글기프트카드' },
];

const ProductInfo = () => (
  <div className="space-y-2">
    <h2 className="text-lg font-bold">상품 이름</h2>
    <p className="text-sm text-gray-600">정가 50,000원</p>
    <p className="text-sm text-gray-600">판매가 45,000원</p>
    <p className="text-sm text-gray-600">할인율 9.00%</p>
  </div>
);

const ProductImage = () => (
  <div className="w-full relative aspect-[170/100]">
    <Image
      src="/placeholders/170x100.svg"
      alt="Product placeholder"
      fill
      sizes="100vw"
      className="object-contain"
      priority
    />
  </div>
);

const ProductDescription = () => (
  <Card className="p-4 w-full">
    <h3 className="text-lg font-medium mb-4">상품설명</h3>
    <div className="min-h-[200px] lg:min-h-[400px]" />
  </Card>
);

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

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
        min="1"
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

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const productImage = <ProductImage />;
  const productInfo = <ProductInfo />;
  const quantitySelector = (
    <QuantitySelector
      quantity={quantity}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onChange={handleQuantityChange}
    />
  );
  const productDescription = <ProductDescription />;

  return (
    <FlexColumn spacing={2} marginY={2} className="w-full">
      <Breadcrumbs items={breadcrumbItems} marginLeft={1} />
      {isDesktop ? (
        <div className="grid grid-cols-[2fr,1fr] gap-8 w-full">
          {productDescription}
          <div className="space-y-2 w-full">
            {productImage}
            {productInfo}
            {quantitySelector}
          </div>
        </div>
      ) : (
        <div className="space-y-1">
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
