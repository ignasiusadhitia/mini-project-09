import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    register: (action) => {
      console.log('User registered successfully', action.payload);
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
