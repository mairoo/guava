import { authApi } from '@/store/auth/api';
import { authSlice } from '@/store/auth/slice';
import { cartApi } from '@/store/cart/api';
import { cartSlice } from '@/store/cart/slice';
import { categoryApi } from '@/store/categories/api';
import { categorySlice } from '@/store/categories/slice';
import { productApi } from '@/store/products/api';
import { productSlice } from '@/store/products/slice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cartApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
