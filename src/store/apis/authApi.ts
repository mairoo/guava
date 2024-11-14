import {baseQueryWithReauth} from '@/store/baseQuery';
import {LoginRequest, LoginResponse, LogoutResponse} from '@/types/auth';
import {createApi} from '@reduxjs/toolkit/query/react';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<LoginResponse, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: '/auth/sign-out',
                method: 'POST',
            }),
        }),
    }),
});

export const {useLoginMutation, useRefreshMutation, useLogoutMutation} = authApi;

export {authApi};