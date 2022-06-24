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

// Create new Car Item
export const createCarItem = createAsyncThunk(
  'carItems/create',
  async (carItemData, thunkAPI) => {
    // Get token

    // Use service
    return await carItemService.createCarItem(carItemData);
  }
);

// Update Car Item
export const updateCarItem = createAsyncThunk(
  'carItems/update',
  async (reqForm, thunkAPI) => {
    // Get token

    // Use service
    let itemID = reqForm['itemId'];
    let status = reqForm['availableUpdate'];
    return await carItemService.updateCarItem(itemID, status);
  }
);

// Delete Car Item
export const deleteCarItem = createAsyncThunk(
  'carItems/delete',
  async (itemID, thunkAPI) => {
    // Get token

    // Use service
    return await carItemService.deleteCarItem(itemID);
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
      .addCase(createCarItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCarItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carItems.push(action.payload);
      })
      .addCase(createCarItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateCarItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCarItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(updateCarItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCarItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCarItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.carItems = state.carItems.filter(
          (carItem) => carItem._id !== action.payload.id
        )
      })
      .addCase(deleteCarItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = carItemSlice.actions;
export default carItemSlice.reducer;