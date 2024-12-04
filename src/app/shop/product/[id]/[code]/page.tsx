'use client';

import { Breadcrumbs, FlexColumn } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';

const breadcrumbItems = [
  { text: '홈', url: '/' },
  { text: '상품', url: '/products' },
  { text: '구글기프트카드' },
];

const ProductInfo = () => (
  <div className="space-y-2">
    <h2 className="text-lg font-medium">상품 이름</h2>
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
  <div className="space-y-1">
    <div className="text-sm">수량</div>
    <div className="flex items-center space-x-2">
      <Button variant="outline" className="px-3 py-1" onClick={onDecrement}>
        -
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={onChange}
        className="w-16 text-center px-3 py-2 border rounded-md"
        min="1"
      />
      <Button variant="outline" className="px-3 py-1" onClick={onIncrement}>
        +
      </Button>
    </div>
    <Button className="w-full">담기</Button>
  </div>
);

const ProductDetailPage = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [quantity, setQuantity] = React.useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value);
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
