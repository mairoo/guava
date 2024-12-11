import { baseQueryWithRetry } from '@/store/baseQuery';
import { Products } from '@/types/product';
import { ApiResponse } from '@/types/response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      ApiResponse<Products.Product[]>,
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

    getProduct: builder.query<ApiResponse<Products.Product>, { id: number }>({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    searchProducts: builder.query<
      ApiResponse<Products.Product>,
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

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
} = productApi;
