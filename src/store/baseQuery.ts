import {LoginResponse} from '@/types/auth';
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {RootState} from '.';
import {logout, setCredentials} from './slices/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken;
        const tokenType = (getState() as RootState).auth.tokenType;
        if (token && tokenType) {
            headers.set('Authorization', `${tokenType} ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            // 액세스 토큰 만료 시 리프레시 시도
            const refreshResult = await baseQuery(
                {url: '/auth/refresh', method: 'POST'},
                api,
                extraOptions
            );

            if (refreshResult.data) {
                const refreshResponse = refreshResult.data as LoginResponse;
                // 새 토큰 저장
                api.dispatch(setCredentials(refreshResponse));
                // 원래 요청 재시도
                result = await baseQuery(args, api, extraOptions);
            } else {
                // 리프레시 실패 시 로그아웃
                api.dispatch(logout());
            }
        }

        return result;
    };