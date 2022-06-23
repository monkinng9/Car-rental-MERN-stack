import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carItemService from './carItemService';

const initialState = {
  carItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get Car Items
export const getCarItems = createAsyncThunk(
  'carItems/getAll',
  async (_, thunkAPI) => {
    // Get token

    // Use service
    return await carItemService.getCarItems();
  }
);

export const carItemSlice = createSlice({
  name: 'carItem',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCarItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carItems = action.payload
      })
      .addCase(getCarItems.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = carItemSlice.actions;
export default carItemSlice.reducer;