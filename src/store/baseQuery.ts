import {Auth} from '@/types/auth';
import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {RootState} from '.';
import {logout, setCredentials} from './slices/authSlice';

const mutex = new Mutex();

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
        await mutex.waitForUnlock();
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
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