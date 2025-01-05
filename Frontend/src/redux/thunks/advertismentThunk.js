import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setFilteredAdvertisments } from '../slices/advertismentSlice';


//------ searchAdvertisment ------
export const searchAdvertisment = (filters) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/ARZ/advertisment/search', filters);
    dispatch(setFilteredAdvertisments(response.data));
  } catch (error) {
    console.error('Search Advertisements Error', error);
  }
};

//------ fetchAdvertismentsByCategory ------
export const fetchAdvertismentsByCategory = createAsyncThunk(
  'ad/AdvByCategory',
  async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ARZ/advertisment/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Search AdvertisementsByCategory Error', error);
    }
  }
  
);


//------ getAdvertismentById ------
export const getAdvertismentById = createAsyncThunk(
  'advert/getId',
  async (id) => {
      try {
          const response = await axios.get(`http://localhost:5000/api/ARZ/advertisment/${id}`);
          return response.data;
      } catch (error) {
          console.error("Get  Advertisment By Id Error", error);
          throw error;
      }
  }
);
//------ getAllAdvertisment ------
export const getAllAdvertisment = createAsyncThunk(
  'advert/getAll',
  async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/ARZ/advertisment');
          return response.data;
      } catch (error) {
          console.error("Get All Advertisment Error", error);
          throw error;
      }
  }
);

//------ postAdvertisment ------
export const postAdvertisment = createAsyncThunk('/postAd', async (formData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/ARZ/advertisment', formData
    );
        return response.data;
    } catch (error) {
        console.log("Post Advertisment Error", error);
        throw error; // Ensure proper error handling
    }
});
//------ deleteAdvertisment ------
export const deleteAdvertisment = createAsyncThunk('/deleteAd', async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/ARZ/advertisment/${id}`);
        return response.data;
    } catch (error) {
        console.log("Delete Advertisment Error", error);
        throw error; // Ensure proper error handling
    }
});
//------ Thunk to update a post ------
export const updatePost = createAsyncThunk(
  '/updatePost',
  async ({ _id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/ARZ/advertisment/${_id}`,data
      );
      
      return response.data; // The updated item
    } catch (error) {
      console.error('Error Thunk:', error);
      return rejectWithValue(error.response?.data || 'An error occurred while updating the advertisement.');
    }
  }
);

