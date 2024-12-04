'use client';

import { Breadcrumbs, FlexColumn } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React, { ChangeEvent } from 'react';

const breadcrumbItems = [
  { text: '홈', url: '/' },
  { text: '상품', url: '/products' },
  { text: '구글기프트카드' },
];

const ProductDetailPage = () => {
  const [quantity, setQuantity] = React.useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value);
  };

  return (
    <FlexColumn spacing={2} marginY={2} className="w-full">
      <Breadcrumbs items={breadcrumbItems} marginLeft={1} />

      <div className="w-full">
        {/* 모바일 레이아웃 */}
        <div className="block lg:hidden space-y-4">
          <div className="w-full relative aspect-[170/100]">
            <Image
              src="/placeholders/170x100.svg"
              alt="Product placeholder"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">상품 이름</h2>
            <p className="text-sm text-gray-600">정가</p>
            <p className="text-sm text-gray-600">판매가</p>
            <p className="text-sm text-gray-600">할인율</p>
          </div>

          <div className="space-y-4">
            <div className="text-sm">수량</div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="px-3 py-1"
                onClick={handleDecrement}
              >
                -
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center px-3 py-2 border rounded-md"
                min="1"
              />
              <Button
                variant="outline"
                className="px-3 py-1"
                onClick={handleIncrement}
              >
                +
              </Button>
            </div>
            <Button className="w-full">담기</Button>
          </div>

          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">상품설명</h3>
            <div className="min-h-[200px]" />
          </Card>
        </div>

        {/* 데스크톱 레이아웃 */}
        <div className="hidden lg:grid grid-cols-[2fr,1fr] gap-8 w-full">
          <Card className="py-4 w-full">
            <h3 className="text-lg font-medium mb-4">상품설명</h3>
            <div className="min-h-[400px]" />
          </Card>

          <div className="space-y-6 w-full">
            <div className="w-full relative aspect-[170/100]">
              <Image
                src="/placeholders/170x100.svg"
                alt="Product placeholder"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium">상품 이름</h2>
              <p className="text-sm text-gray-600">정가</p>
              <p className="text-sm text-gray-600">판매가</p>
              <p className="text-sm text-gray-600">할인율</p>
            </div>

            <div className="space-y-4">
              <div className="text-sm">수량</div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="px-3 py-1"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center px-3 py-2 border rounded-md"
                  min="1"
                />
                <Button
                  variant="outline"
                  className="px-3 py-1"
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </div>
              <Button className="w-full">담기</Button>
            </div>
          </div>
        </div>
      </div>
    </FlexColumn>
  );
};

export default ProductDetailPage;
