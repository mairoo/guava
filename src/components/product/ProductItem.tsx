import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef } from 'react';

interface ProductItemProps extends ComponentPropsWithoutRef<'div'> {
  imageUrl: string;
  title: string;
  discountRate: number;
  url: string;
  showBorder?: boolean;
}

export const ProductItem = ({
  imageUrl = 'https://placehold.co/170x100?text=Product',
  title = '상품명',
  discountRate = 1.0,
  url = '#',
  showBorder = false,
}: ProductItemProps) => {
  const formattedRate = discountRate.toFixed(2);

  return (
    <Link href={url} className="block w-full">
      <Card
        className={`
          w-full overflow-hidden shadow-none hover:shadow-md transition-shadow
          ${showBorder ? 'border' : 'border-0'}
        `}
      >
        <CardContent className="p-1">
          <div className="relative aspect-[157/100] w-full mb-2 border border-gray-800 rounded-md overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="space-y-1 text-center">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
              {title}
            </h3>

            <div className="flex items-center justify-center gap-1 text-red-500">
              <span className="text-sm font-semibold">
                최대 {formattedRate}%
              </span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
