import {logout, setCredentials} from '@/store/auth/slice';
import {baseQueryWithRetry} from '@/store/baseQuery';
import {Auth} from '@/types/auth';
import {storage} from '@/utils';
import {auth} from '@/utils/auth';
import {createApi} from '@reduxjs/toolkit/query/react';

/**
 * Redux Toolkit Query를 사용하여 인증 관련 API 엔드포인트들을 정의
 * - login: 로그인 처리
 * - refresh: 토큰 갱신
 * - logout: 로그아웃 처리
 */
const api = createApi({
  // API 슬라이스의 고유 식별자
  reducerPath: 'authApi',
  // 기본 API 설정 (재시도 로직이 포함된 baseQuery 사용)
  baseQuery: baseQueryWithRetry,
  // API 엔드포인트 정의
  endpoints: (builder) => ({
    /**
     * 로그인 엔드포인트
     * @param credentials - 로그인에 필요한 인증 정보 (이메일, 비밀번호, 자동로그인 여부)
     * @returns 로그인 응답 데이터 (액세스 토큰, 만료 시간 등)
     */
    login: builder.mutation<Auth.LoginResponse, Auth.LoginRequest>({
      // API 요청 설정
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
      // 요청 시작 시 실행되는 콜백
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          // API 요청이 성공적으로 완료될 때까지 대기
          const { data } = await queryFulfilled;

          // 자동 로그인 설정 저장
          storage.setRememberMe(credentials.rememberMe);
          // 마지막 토큰 갱신 시간 저장
          storage.setLastRefreshTime(Date.now());

          // Next.js 미들웨어에서 접근할 수 있도록 쿠키에 인증 상태 저장
          auth.setAuthCookie(data.data.expiresIn);

          // Redux store에 인증 정보 저장
          dispatch(setCredentials(data));
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    /**
     * 토큰 갱신 엔드포인트
     * 액세스 토큰이 만료되었을 때 새로운 토큰을 발급받음
     */
    refresh: builder.mutation<Auth.LoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // 쿠키의 인증 상태 갱신
          auth.setAuthCookie(data.data.expiresIn);

          // 리프레시 시간 저장
          // 두 가지 경우에 저장됨:
          // 1. 이 refresh mutation을 직접 호출할 때
          // 2. baseQueryWithRetry에서 401 에러 발생으로 자동 리프레시될 때
          storage.setLastRefreshTime(Date.now());

          // Redux store 인증 정보 갱신
          dispatch(setCredentials(data));
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      },
    }),

    /**
     * 로그아웃 엔드포인트
     * 서버에 로그아웃 요청을 보내고 클라이언트의 인증 상태를 초기화
     */
    logout: builder.mutation<Auth.LogoutResponse, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // 인증 관련 쿠키 삭제
          auth.removeCookie('isAuthenticated');

          // Redux store의 인증 상태 초기화
          dispatch(logout());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

// 각 엔드포인트에 대한 React hooks 내보내기
export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = api;

export { api };
