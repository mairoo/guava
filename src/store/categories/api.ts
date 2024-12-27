import { baseQueryWithRetry } from '@/store/baseQuery';
import { Categories } from '@/types/category';
import { ApiResponse } from '@/types/response';

import { createApi } from '@reduxjs/toolkit/query/react';

const CACHE_LIFETIME = 5 * 60;

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Category'],
  keepUnusedDataFor: CACHE_LIFETIME,
  endpoints: (builder) => ({
    getCategory: builder.query<
      ApiResponse<Categories.Category>,
      string
    >({
      query: (slug) => ({
        url: `/categories/${slug}`,
        method: 'GET',
      }),
      providesTags: (_, __, slug) => [
        { type: 'Category', id: slug },
      ],
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
