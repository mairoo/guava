import {configureStore} from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// API 설정
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    endpoints: () => ({
        // 여기에 엔드포인트를 추가할 수 있습니다
    }),
})

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
