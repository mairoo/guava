import {AuthState, LoginResponse} from '@/types/auth';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: AuthState = {
    accessToken: null,
    tokenType: null,
    expiresIn: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            state.accessToken = action.payload.data.accessToken;
            state.tokenType = action.payload.data.tokenType;
            state.expiresIn = action.payload.data.expiresIn;
        },
        logout: (state) => {
            state.accessToken = null;
            state.tokenType = null;
            state.expiresIn = null;
            localStorage.removeItem('rememberMe');
        },
    },
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;
