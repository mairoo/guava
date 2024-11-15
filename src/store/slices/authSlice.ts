import { Auth } from '@/types/auth';
import storage from '@/utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Auth.State.AuthState = {
  accessToken: null,
  tokenType: null,
  expiresIn: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Auth.LoginResponse>) => {
      state.accessToken = action.payload.data.accessToken;
      state.tokenType = action.payload.data.tokenType;
      state.expiresIn = action.payload.data.expiresIn;
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

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
