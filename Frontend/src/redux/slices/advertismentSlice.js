import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAdvertisment,
  postAdvertisment,
  deleteAdvertisment,
  updatePost,
  fetchAdvertismentsByCategory,
  getAdvertismentById
} from "../thunks/advertismentThunk";

const initialState = {
  advertisments: [],
  filteredAdvertisments: [],
  filteredAdvertismentByCategory: [],
  filteredAdvertismentById: [],
  loading: false,
  error: null,
};

const advertismentSlice = createSlice({
  name: "Advertisment",
  initialState,
  reducers: {
    setFilteredAdvertisments: (state, action) => {
      state.loading = false;
      state.filteredAdvertisments = action.payload;
    },
    // No need for setFilteredAdvertismentByCategory in this case
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdvertisment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdvertisment.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisments = action.payload;
      })
      .addCase(getAllAdvertisment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postAdvertisment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAdvertisment.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisments.push(action.payload);
      })
      .addCase(postAdvertisment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAdvertisment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdvertisment.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisments = state.advertisments.filter(ad => ad._id !== action.payload._id);
      })
      .addCase(deleteAdvertisment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.advertisments = state.advertisments.map(advertisment =>
          advertisment._id === action.payload._id ? action.payload : advertisment
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAdvertismentsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvertismentsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredAdvertismentByCategory = action.payload;
      })
      .addCase(fetchAdvertismentsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAdvertismentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdvertismentById.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredAdvertismentById = action.payload;
      })
      .addCase(getAdvertismentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilteredAdvertisments } = advertismentSlice.actions;

export default advertismentSlice.reducer;
