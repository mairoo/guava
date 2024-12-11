import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductsState {
  selectedCategory: string | null;
}

const initialState: ProductsState = {
  selectedCategory: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = productSlice.actions;

export default productSlice.reducer;
