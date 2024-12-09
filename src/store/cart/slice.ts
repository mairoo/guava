import { CartItem, CartState } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartApi } from './api'; // localStorage 키 상수

// localStorage 키 상수
const CART_STORAGE_KEY = 'cart_items';

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 로컬 상태 업데이트를 위한 리듀서
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      // localStorage에 장바구니 상태 저장
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.items = [];
      state.error = null;
      // localStorage에서 장바구니 데이터 제거
      localStorage.removeItem(CART_STORAGE_KEY);
    },
    // localStorage에서 장바구니 상태 복원
    hydrateCart: (state) => {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      if (storedItems) {
        state.items = JSON.parse(storedItems);
      }
    },
  },
  // RTK Query의 결과를 slice 상태와 동기화
  extraReducers: (builder) => {
    builder
      // getCart 쿼리 결과 처리
      .addMatcher(
        cartApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload;
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
        },
      )
      // addToCart 뮤테이션 결과 처리
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, { payload }) => {
          const existingItem = state.items.find(
            (item) => item.id === payload.id,
          );
          if (existingItem) {
            existingItem.quantity += payload.quantity;
          } else {
            state.items.push(payload);
          }
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
        },
      )
      // updateQuantity 뮤테이션 결과 처리
      .addMatcher(
        cartApi.endpoints.updateQuantity.matchFulfilled,
        (state, { payload }) => {
          const index = state.items.findIndex((item) => item.id === payload.id);
          if (index !== -1) {
            state.items[index] = payload;
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
          }
        },
      )
      // removeFromCart 뮤테이션 결과 처리
      .addMatcher(
        cartApi.endpoints.removeFromCart.matchFulfilled,
        (state, { meta }) => {
          const itemId = meta.arg.originalArgs; // 삭제된 아이템의 ID
          state.items = state.items.filter((item) => item.id !== itemId);
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
        },
      );
  },
});

export const { setCartItems, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
