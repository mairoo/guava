import { baseQueryWithRetry } from '@/store/baseQuery';
import { Categories } from '@/types/category';
import { ApiResponse } from '@/types/response';

import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategory: builder.query<
      ApiResponse<Categories.Category>,
      string | number
    >({
      query: (identifier) => ({
        url: `/categories/${identifier}`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApi;
