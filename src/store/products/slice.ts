import { Products } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  products: Products.Product[];
  currentPage: number;
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentPage: 1,
  selectedCategory: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products.ProductsResponse>) => {
      state.products = action.payload.data;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setProducts,
  setCurrentPage,
  setSelectedCategory,
} = productSlice.actions;

export default productSlice.reducer;
