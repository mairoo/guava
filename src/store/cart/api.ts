import { baseQueryWithRetry } from '@/store/baseQuery';
import { CartItem } from '@/types/cart';
import { createApi } from '@reduxjs/toolkit/query/react';

/**
 * 장바구니 관련 API 엔드포인트 정의
 * RTK Query를 사용하여 서버와의 동기화 처리
 */
export const cartApi = createApi({
  // API 리듀서 경로 지정
  reducerPath: 'cartApi',

  // 재시도 로직이 포함된 기본 쿼리 설정 사용
  baseQuery: baseQueryWithRetry,

  // 캐시 무효화를 위한 태그 타입 정의
  tagTypes: ['Cart'],

  endpoints: (builder) => ({
    /**
     * 장바구니 데이터 조회 엔드포인트
     *
     * @returns Promise<CartItem[]> 장바구니 아이템 배열
     * @description
     * - GET /shop/cart 엔드포인트 호출
     * - 캐시된 데이터가 있으면 재사용
     * - 데이터가 없거나 만료된 경우 서버에서 새로 조회
     */
    getCart: builder.query<CartItem[], void>({
      query: () => '/shop/cart',
      providesTags: ['Cart'], // 캐시 태그 설정
    }),

    /**
     * 장바구니 전체 데이터 동기화 엔드포인트
     *
     * @param items CartItem[] - 동기화할 장바구니 아이템 배열
     * @returns Promise<CartItem[]> 서버에서 응답받은 최신 장바구니 상태
     * @description
     * - PUT /shop/cart/sync 엔드포인트 호출
     * - 클라이언트의 전체 장바구니 상태를 서버로 전송
     * - 응답으로 서버의 최신 상태를 받아서 동기화
     * - 캐시를 무효화하여 getCart가 최신 데이터를 조회하도록 함
     */
    syncCart: builder.mutation<CartItem[], CartItem[]>({
      query: (items) => ({
        url: '/shop/cart/sync',
        method: 'PUT',
        body: { items },
      }),
      invalidatesTags: ['Cart'], // 캐시 무효화
    }),
  }),
});

// 생성된 리액트 훅 익스포트
export const {
  useGetCartQuery,    // 장바구니 조회 훅
  useSyncCartMutation // 장바구니 동기화 훅
} = cartApi;