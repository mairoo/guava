import { Auth } from '@/types/auth';
import storage from '@/utils/storage';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { RootState } from '.';
import { logout, setCredentials } from './auth/slice';

const REFRESH_TOKEN_EXPIRY_BUFFER = 60 * 1000; // 60초 이내 재시도 방지
const MAX_REFRESH_ATTEMPTS = 3; // 최대 리프레시 시도 횟수
const mutex = new Mutex(); // 뮤텍스 잠금으로 동시 리프레시 방지

let refreshAttempts = 0;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    const tokenType = (getState() as RootState).auth.tokenType;

    if (token && tokenType) {
      headers.set('Authorization', `${tokenType} ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const lastRefreshTime = storage.getLastRefreshTime();

    // 리프레시 토큰 만료되었거나 remember me 없으면 로그아웃
    if (
      !storage.getRememberMe() ||
      (lastRefreshTime &&
        Date.now() - lastRefreshTime <= REFRESH_TOKEN_EXPIRY_BUFFER)
    ) {
      api.dispatch(logout());
      return result;
    }

    // 이미 3회 이상 시도했으면 로그아웃
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      api.dispatch(logout());
      return result;
    }

    // 동시 리프레시 방지
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        refreshAttempts++;

        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'POST' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const refreshResponse = refreshResult.data as Auth.LoginResponse;
          api.dispatch(setCredentials(refreshResponse));
          refreshAttempts = 0; // 성공하면 카운터 리셋
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch (error) {
        api.dispatch(logout());
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
