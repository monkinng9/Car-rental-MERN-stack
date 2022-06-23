import { configureStore } from '@reduxjs/toolkit';
import carItemReducer from '../features/carItems/carItemSlice'


export const store = configureStore({
  reducer: {
    carItems: carItemReducer
  },
});
