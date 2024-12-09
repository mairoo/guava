import { logout, setCredentials } from '@/store/auth/slice';
import { baseQueryWithRetry } from '@/store/baseQuery';
import { Auth } from '@/types/auth';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';

import { createApi } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    login: builder.mutation<Auth.LoginResponse, Auth.LoginRequest>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          storage.setRememberMe(credentials.rememberMe);
          storage.setLastRefreshTime(Date.now());

          // 쿠키에 인증 상태 저장 - Next.js 미들웨어 접근 로그인 유무 판단 기준
          auth.setAuthCookie(data.data.expiresIn);

          dispatch(setCredentials(data));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),
    refresh: builder.mutation<Auth.LoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 쿠키 인증 상태 갱신
          auth.setAuthCookie(data.data.expiresIn);

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // 쿠키 삭제
          auth.removeCookie('isAuthenticated');

          dispatch(logout());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = api;

export { api };
