import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  expiresAt: null,
  rememberMe: false,
  loading: false,
  error: null,
  isSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
      state.rememberMe = action.payload.rememberMe;
      state.loading = false;
      state.error = null;
      state.isSuccess = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.expiresAt = null;
      state.rememberMe = false;
      state.loading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase();
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
