// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice.js'; 

// Create store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
