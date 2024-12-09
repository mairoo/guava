import { api as authApi } from '@/store/auth/api';
import authSlice from '@/store/auth/slice';
import { api as productsApi } from '@/store/products/api';
import productsSlice from '@/store/products/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
