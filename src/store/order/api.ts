import { baseQueryWithRetry } from '@/store/baseQuery';
import { Orders } from '@/types/order';
import { ApiResponse } from '@/types/response';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getMyOrders: builder.query<
      ApiResponse<Orders.OrdersResponse>,
      { condition?: Orders.OrderSearchCondition; page?: number; size?: number }
    >({
      query: ({ condition, page = 0, size = 20 }) => ({
        url: '/orders',
        method: 'GET',
        params: {
          ...condition,
          page,
          size,
        },
      }),
      providesTags: ['Orders'],
    }),

    getOrder: builder.query<ApiResponse<Orders.Order>, { id: number }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    createOrder: builder.mutation<
      ApiResponse<Orders.Order>,
      { order: Partial<Orders.Order> }
    >({
      query: ({ order }) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),

    reorder: builder.mutation<ApiResponse<Orders.Order>, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}/reorder`,
        method: 'POST',
      }),
      invalidatesTags: ['Orders'],
    }),

    requestRefund: builder.mutation<
      ApiResponse<void>,
      { orderId: number; reason: string }
    >({
      query: ({ orderId, reason }) => ({
        url: `/orders/${orderId}/refund`,
        method: 'POST',
        body: { reason },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useReorderMutation,
  useRequestRefundMutation,
} = orderApi;
