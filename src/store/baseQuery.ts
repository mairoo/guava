import {Auth} from '@/types/auth';
import storage from '@/utils/storage';
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {RootState} from '.';
import {logout, setCredentials} from './slices/authSlice';

const REFRESH_TOKEN_EXPIRY_BUFFER = 60 * 1000;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include', // 항상 쿠키 전송 (리프레시 토큰 전송)
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.accessToken;
        const tokenType = (getState() as RootState).auth.tokenType;

        if (token && tokenType) {
            headers.set('Authorization', `${tokenType} ${token}`);
        }

        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        await mutex.waitForUnlock();
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            const lastRefreshTime = storage.getLastRefreshTime();

            if (!storage.getRememberMe() || (lastRefreshTime && Date.now() - lastRefreshTime < REFRESH_TOKEN_EXPIRY_BUFFER)) {
                api.dispatch(logout());
                return result;
            }

            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                try {
                    const refreshResult = await baseQuery(
                        {url: '/auth/refresh', method: 'POST'},
                        api,
                        extraOptions
                    );

                    if (refreshResult.data) {
                        const refreshResponse = refreshResult.data as Auth.LoginResponse;
                        api.dispatch(setCredentials(refreshResponse));
                        storage.setLastRefreshTime(Date.now());
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(logout());
                    }
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