import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import React from 'react';

interface ProductItemBuyProps {
  imageUrl: string;
  name: string;
  subtitle: string;
  discountRate: number;
  price: number;
  onAddToCart?: () => void;
}

export const ProductItemBuy = ({
  imageUrl = 'https://placehold.co/170x100?text=Product',
  name = '상품명',
  subtitle = '',
  discountRate = 1.0,
  price = 0,
  onAddToCart,
}: ProductItemBuyProps) => {
  const formattedRate = discountRate.toFixed(2);
  const formattedPrice = price.toLocaleString();

  return (
    <Card className="w-full overflow-hidden shadow-none hover:shadow-md transition-shadow border-gray-200">
      <CardContent className="p-0">
        <div className="relative aspect-[157/100] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="px-2 space-y-2 text-center">
          <h1 className="font-medium text-sm text-gray-900 line-clamp-2">
            {name}
          </h1>
          <h2 className="font-medium text-sm text-gray-900 line-clamp-2">
            {subtitle}
          </h2>

          <div className="flex items-center justify-center gap-1 text-red-500">
            <span className="text-sm font-semibold">최대 {formattedRate}%</span>
            <ArrowDown className="w-4 h-4" />
          </div>

          <p className="text-gray-900 font-bold">₩{formattedPrice}</p>
        </div>
      </CardContent>

      <CardFooter className="mt-1 p-2 bg-gray-100 justify-center">
        <Button
          variant="outline"
          size="sm"
          className="border-gray-900 text-gray-900 hover:bg-white"
          onClick={onAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          담기
        </Button>
      </CardFooter>
    </Card>
  );
};
