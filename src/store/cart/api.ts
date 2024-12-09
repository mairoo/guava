import { baseQueryWithRetry } from '@/store/baseQuery';
import { CartItem } from '@/types/cart';
import { createApi } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => '/shop/cart',
      providesTags: ['Cart'],
    }),

    syncCart: builder.mutation<CartItem[], CartItem[]>({
      query: (items) => ({
        url: '/shop/cart/sync',
        method: 'PUT',
        body: { items },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useSyncCartMutation } = cartApi;
