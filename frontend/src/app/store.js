import { configureStore } from '@reduxjs/toolkit';
import carItemReducer from '../features/carItems/carItemSlice';
import authReducer from '../features/auth/authSlice';



export const store = configureStore({
  reducer: {
    carItems: carItemReducer,
    auth: authReducer,
  },
});
