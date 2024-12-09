import {Auth} from '@/types/auth';
import {storage} from '@/utils';
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {RootState} from '.';
import {logout, setCredentials} from './auth/slice';

/**
 * 토큰 갱신 관련 상수 정의
 */
// 토큰 갱신 후 60초 동안은 재시도하지 않음 (과도한 요청 방지)
const REFRESH_TOKEN_EXPIRY_BUFFER = 60 * 1000;
// 최대 토큰 갱신 시도 횟수 (무한 루프 방지)
const MAX_REFRESH_ATTEMPTS = 3;
// 동시에 여러 요청이 토큰을 갱신하는 것을 방지하기 위한 뮤텍스
const mutex = new Mutex();

// 토큰 갱신 시도 횟수를 추적하는 카운터
let refreshAttempts = 0;

/**
 * RTK Query의 기본 설정
 * - API 기본 URL 설정
 * - 쿠키 포함 설정
 * - 헤더 설정 (인증 토큰, Content-Type 등)
 */
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  credentials: 'include', // 쿠키를 포함한 인증 정보 전송
  prepareHeaders: (headers, { getState }) => {
    // Redux store에서 인증 정보 가져오기
    const token = (getState() as RootState).auth.accessToken;
    const tokenType = (getState() as RootState).auth.tokenType;

    // 인증 토큰이 있으면 Authorization 헤더 설정
    if (token && tokenType) {
      headers.set('Authorization', `${tokenType} ${token}`);
    }

    // JSON 형식으로 통신
    headers.set('Content-Type', 'application/json');

    return headers;
  },
});

/**
 * 토큰 갱신 로직이 포함된 확장된 baseQuery
 * - 토큰 만료 시 자동 갱신
 * - 401 에러 시 토큰 갱신 시도
 * - 동시 갱신 요청 방지
 * - 최대 시도 횟수 제한
 */
export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const { accessToken, expiresIn } = state.auth;

  // 토큰이 만료 예정인 경우 사전에 갱신 시도
  if (accessToken && expiresIn && storage.isTokenExpiring(expiresIn)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // 토큰 갱신 요청
        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'POST' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const refreshResponse = refreshResult.data as Auth.LoginResponse;
          storage.setLastRefreshTime(Date.now());
          api.dispatch(setCredentials(refreshResponse));
        }
      } finally {
        release(); // 뮤텍스 해제
      }
    }
  }

  // 다른 요청이 토큰을 갱신 중이면 대기
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // 401 에러(인증 실패) 처리
  if (result.error && result.error.status === 401) {
    const lastRefreshTime = storage.getLastRefreshTime();

    // 자동 로그인이 비활성화되었거나 최근에 갱신을 시도했던 경우 로그아웃
    if (
      !storage.getRememberMe() ||
      (lastRefreshTime &&
        Date.now() - lastRefreshTime <= REFRESH_TOKEN_EXPIRY_BUFFER)
    ) {
      api.dispatch(logout());
      window.location.href = '/auth/sign-in';
    }

    // 최대 시도 횟수 초과 시 로그아웃
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      api.dispatch(logout());
      window.location.href = '/auth/sign-in';
    }

    // 다른 요청이 토큰을 갱신하고 있지 않은 경우에만 갱신 시도
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        refreshAttempts++;

        // 토큰 갱신 시도
        const refreshResult = await baseQuery(
          { url: '/auth/refresh', method: 'POST' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // 토큰 갱신 성공
          const refreshResponse = refreshResult.data as Auth.LoginResponse;
          storage.setLastRefreshTime(Date.now());
          api.dispatch(setCredentials(refreshResponse));
          refreshAttempts = 0; // 성공하면 시도 횟수 초기화
          // 원래 요청 재시도
          result = await baseQuery(args, api, extraOptions);
        } else {
          // 토큰 갱신 실패
          api.dispatch(logout());
          window.location.href = '/auth/sign-in';
        }
      } catch (error) {
        // 예외 발생 시 로그아웃
        api.dispatch(logout());
        window.location.href = '/auth/sign-in';
      } finally {
        release(); // 뮤텍스 해제
      }
    } else {
      // 다른 요청이 토큰을 갱신 중이면 대기 후 재시도
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
