import { baseQueryWithRetry } from '@/store/baseQuery';
import { CartItem } from '@/types/cart';
import { createApi } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    // 장바구니 목록 조회
    getCart: builder.query<CartItem[], void>({
      query: () => '/shop/cart',
      providesTags: ['Cart'],
    }),

    // 상품 추가
    addToCart: builder.mutation<
      CartItem,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: '/shop/cart/add',
        method: 'POST',
        body: { productId, quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    // 수량 업데이트
    updateQuantity: builder.mutation<
      CartItem,
      { itemId: number; quantity: number }
    >({
      query: ({ itemId, quantity }) => ({
        url: `/shop/cart/${itemId}`,
        method: 'PUT',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),

    // 상품 제거
    removeFromCart: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `/shop/cart/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
} = cartApi;
