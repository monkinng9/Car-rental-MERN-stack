import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import borrowCarFormService from './borrowCarFormService';

const initialState = {
  borrowForms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// @available   end-user
// @desc        Create Borrow Car Form
export const createBorrowCarform = createAsyncThunk('borrowCarForm/creatBorrowCarForm', async (reqForm, thunkAPI) => {
  try {
    // Get token
    const token = thunkAPI.getState().auth.user.token;
    // Use service
    let carItemID = reqForm['carItemID'];
    let dueTime = reqForm['dueTime'];

    return await borrowCarFormService.createBorrowCarform(carItemID, dueTime, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// @available   end-user 
// @desc        Get specific Borrow Form for end-user
export const getBorrowCarForm = createAsyncThunk('borrowCarForm/getForUser', async (_, thunkAPI) => {
  try {
    // Get token
    const token = thunkAPI.getState().auth.user.token;
    // Use service
    return await borrowCarFormService.getSpecificBorrowCarForm(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// @available   end-user 
// @desc        Get specific Borrow Form for end-user
export const updateBorrowCarForm = createAsyncThunk('borrowCarForm/updateForm', async (bodyForm, thunkAPI) => {
  try {
    // Get token
    const token = thunkAPI.getState().auth.user.token;
    // Use service
    return await borrowCarFormService.updateBorrowCarForm(bodyForm, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const borrowCarFormSlice = createSlice({
  name: 'borrowCarForm',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBorrowCarForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBorrowCarForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.borrowForms = action.payload;
      })
      .addCase(getBorrowCarForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBorrowCarForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBorrowCarForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.borrowForms = action.payload;
      })
      .addCase(updateBorrowCarForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBorrowCarform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBorrowCarform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(createBorrowCarform.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = borrowCarFormSlice.actions;
export default borrowCarFormSlice.reducer;

