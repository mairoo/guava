'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store';
import { useSyncCartMutation } from '@/store/cart/api';
import { addItem } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { CartItem } from '@/types/cart';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ProductItemBuyProps {
  productId: number;
  imageUrl: string;
  name: string;
  subtitle: string;
  discountRate: number;
  price: number;
}

export const ProductItemBuy = ({
  productId,
  imageUrl = 'https://placehold.co/170x100?text=Product',
  name = '상품명',
  subtitle = '',
  discountRate = 1.0,
  price = 0,
}: ProductItemBuyProps) => {
  const dispatch = useAppDispatch();
  const [syncCart] = useSyncCartMutation();

  const { isAuthenticated } = useAuth();

  const formattedRate = discountRate.toFixed(2);
  const formattedPrice = price.toLocaleString();

  const handleAddToCart = async () => {
    try {
      const cartItem: CartItem = {
        productId,
        name,
        subtitle,
        price,
        quantity: 1,
      };

      dispatch(addItem(cartItem));

      if (isAuthenticated) {
        // dispatch 이후의 최신 상태를 가져옴
        const currentCart = store.getState().cart.items;
        await syncCart(currentCart);
      }

      toast({
        title: `${name} ${subtitle}`,
        description: '장바구니에 담았습니다.',
        duration: 1500,
        className: 'bg-white border border-gray-200 shadow-lg',
      });
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      toast({
        variant: 'destructive',
        title: '장바구니 추가 실패',
        description: '잠시 후 다시 시도해주세요.',
      });
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-none hover:shadow-md transition-shadow border-gray-200">
      <Link href={`/shop/product/${productId}/${name}`} className="block">
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
              <span className="text-sm font-semibold">
                최대 {formattedRate}%
              </span>
              <ArrowDown className="w-4 h-4" />
            </div>

            <p className="text-gray-900 font-bold">₩{formattedPrice}</p>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="mt-1 p-2 bg-gray-100 justify-center">
        <Button
          variant="outline"
          size="sm"
          className="border-gray-900 text-gray-900 hover:bg-white"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
          담기
        </Button>
      </CardFooter>
    </Card>
  );
};
