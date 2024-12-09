import { Products } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  products: Products.Product[];
  totalCount: number;
  currentPage: number;
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  products: [],
  totalCount: 0,
  currentPage: 1,
  selectedCategory: null,
};

export const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products.ProductsResponse>) => {
      state.products = action.payload.data.products;
      state.totalCount = action.payload.data.totalCount;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.selectedCategory = null;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setSelectedCategory,
  clearProducts,
} = slice.actions;

export default slice.reducer;
