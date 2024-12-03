import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';
import React from 'react';

interface ProductItemProps {
  imageUrl: string;
  name: string;
  discountRate: number;
  showBorder?: boolean;
}

const ProductItem = ({
  imageUrl = 'https://placehold.co/170x100?text=Product',
  name = '상품명',
  discountRate = 1.0,
  showBorder = false,
}: ProductItemProps) => {
  const formattedRate = discountRate.toFixed(2);

  return (
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
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-1 text-center">
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center justify-center gap-1 text-red-500">
            <span className="text-sm font-semibold">최대 {formattedRate}%</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
