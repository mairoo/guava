import { Auth } from '@/types/auth';
import { storage } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Auth.State.AuthState = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
  isLoading: true,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Auth.LoginResponse>) => {
      state.accessToken = action.payload.data.accessToken;
      state.tokenType = action.payload.data.tokenType;
      state.expiresIn = action.payload.data.expiresIn;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        state.accessToken = null;
        state.tokenType = null;
        state.expiresIn = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.tokenType = null;
      state.expiresIn = null;

      storage.clearRememberMe();
      storage.clearLastRefreshTime();
    },
  },
});

export const { setCredentials, setAuth, setLoading, logout } = slice.actions;

export default slice.reducer;
