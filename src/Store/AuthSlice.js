// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Fonction pour récupérer le token du localStorage lors de l'initialisation
const getStoredToken = () => {
  return localStorage.getItem('token');
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getStoredToken(), 
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
      // Effacer le token du localStorage lors de la déconnexion
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
