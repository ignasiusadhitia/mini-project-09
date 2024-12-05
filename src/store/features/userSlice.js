import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearUser: (state) => {
      state.selectedUser = null;
    },
  },
});

export const { selectUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
