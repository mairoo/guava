import { CartItem, CartState } from '@/types/cart';
import { storage } from '@/utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartApi } from './api';

// 장바구니 데이터의 localStorage 키
const CART_STORAGE_KEY = 'cart_items';

// 초기 상태 정의
const initialState: CartState = {
  items: [], // 장바구니 아이템 배열
  loading: false, // 로딩 상태
  error: null, // 에러 상태
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * 장바구니 전체 아이템을 설정하는 리듀서
     * @param state 현재 상태
     * @param action 새로운 장바구니 아이템 배열
     */
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      storage.set(CART_STORAGE_KEY, action.payload);
    },

    /**
     * 장바구니에 새 아이템을 추가하는 리듀서
     * 이미 존재하는 아이템의 경우 수량만 증가
     * @param state 현재 상태
     * @param action 추가할 CartItem
     */
    addItem: (state, action: PayloadAction<CartItem>) => {
      // 동일한 상품이 이미 장바구니에 있는지 확인
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // 이미 존재하는 경우 수량만 증가
        existingItem.quantity += action.payload.quantity;
      } else {
        // 새로운 아이템 추가
        state.items.push(action.payload);
      }
      // 변경된 상태를 localStorage에 저장
      storage.set(CART_STORAGE_KEY, state.items);
    },

    /**
     * 특정 아이템의 수량을 업데이트하는 리듀서
     * @param state 현재 상태
     * @param action id와 새로운 수량 정보
     */
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        storage.set(CART_STORAGE_KEY, state.items);
      }
    },

    /**
     * 장바구니에서 특정 아이템을 제거하는 리듀서
     * @param state 현재 상태
     * @param action 제거할 아이템의 id
     */
    removeItem: (state, action: PayloadAction<number>) => {
      // id가 일치하지 않는 아이템만 필터링하여 유지
      state.items = state.items.filter((item) => item.id !== action.payload);
      storage.set(CART_STORAGE_KEY, state.items);
    },

    /**
     * 장바구니를 비우는 리듀서
     * 모든 아이템 제거 및 에러 상태 초기화
     */
    clearCart: (state) => {
      state.items = [];
      state.error = null;
      storage.remove(CART_STORAGE_KEY);
    },

    /**
     * localStorage에서 장바구니 상태를 복원하는 리듀서
     * 페이지 새로고침 시 사용
     */
    hydrateCart: (state) => {
      state.items = storage.get(CART_STORAGE_KEY, []);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      /**
       * 서버에서 장바구니 데이터를 가져온 후 상태를 업데이트
       */
      (state, { payload }) => {
        state.items = payload;
        storage.set(CART_STORAGE_KEY, payload);
      },
    );
  },
});

export const {
  setCartItems,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  hydrateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
