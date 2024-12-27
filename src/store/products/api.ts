import { baseQueryWithRetry } from '@/store/baseQuery';
import { Products } from '@/types/product';
import { ApiResponse } from '@/types/response';
import { createApi } from '@reduxjs/toolkit/query/react';

const CACHE_LIFETIME = 5 * 60;

export const productApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['ProductList', 'ProductDetail', 'SearchResults'],
  keepUnusedDataFor: CACHE_LIFETIME,
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
      providesTags: (_, __, { categorySlug }) => [
        { type: 'ProductList', id: categorySlug || 'all' },
      ],
    }),

    getProduct: builder.query<ApiResponse<Products.Product>, { code: string }>({
      query: ({ code }) => ({
        url: `/products/${code}`,
        method: 'GET',
      }),
      providesTags: (_, __, { code }) => [{ type: 'ProductDetail', id: code }],
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
      providesTags: (_, __, { categorySlug, keyword }) => [
        { type: 'SearchResults', id: `${categorySlug || 'all'}-${keyword}` },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSearchProductsQuery,
} = productApi;
