import { Categories } from '@/types/category';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  selectedCategory: Categories.Category | null;
  categorySlug: string | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
  categorySlug: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (
      state,
      action: PayloadAction<Categories.Category>,
    ) => {
      state.selectedCategory = action.payload;
    },
    setCategorySlug: (state, action: PayloadAction<string>) => {
      state.categorySlug = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
      state.categorySlug = null;
    },
  },
});

export const { setSelectedCategory, setCategorySlug, clearSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
