import { baseQueryWithRetry } from '@/store/baseQuery';
import { setCredentials } from '@/store/slices/authSlice';
import { Auth } from '@/types/auth';
import storage from '@/utils/storage';

import { createApi } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    login: builder.mutation<Auth.LoginResponse, Auth.LoginRequest>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
    }),
    refresh: builder.mutation<Auth.LoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 리프레시 시간 저장 시점이 두 군데
          // - 명시적 refresh mutation 호출 시
          // - baseQueryWithRetry 401 에러로 자동 리프레시 완료 시
          storage.setLastRefreshTime(Date.now());

          dispatch(setCredentials(data));
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      },
    }),
    logout: builder.mutation<Auth.LogoutResponse, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  authApi;

export { authApi };
