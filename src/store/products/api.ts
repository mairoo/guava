import { baseQueryWithRetry } from '@/store/baseQuery';
import { Products } from '@/types/product';
import { createApi } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      Products.ProductsResponse,
      Products.ProductsRequest
    >({
      query: ({ categorySlug }) => ({
        url: '/products',
        method: 'GET',
        params: {
          categorySlug,
        },
      }),
      providesTags: ['Products'],
    }),
    searchProducts: builder.query<
      Products.ProductsResponse,
      Products.SearchProductsRequest
    >({
      query: ({ categorySlug, keyword }) => ({
        url: '/products/search',
        method: 'GET',
        params: {
          categorySlug,
          keyword,
        },
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = api;

export { api };
