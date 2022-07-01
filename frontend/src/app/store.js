import { configureStore } from '@reduxjs/toolkit';
import carItemReducer from '../features/carItems/carItemSlice';
import authReducer from '../features/auth/authSlice';
import borrowCarFormReducer from '../features/borrowCarForm/borrowCarFormSlice';



export const store = configureStore({
  reducer: {
    carItems: carItemReducer,
    auth: authReducer,
    borrowCarForms: borrowCarFormReducer,
  },
});
