import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, 
    user: null,
    userId: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload._id; 
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.userId = null;

    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
