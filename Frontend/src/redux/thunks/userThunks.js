import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (data) => {
  const response = await axios.post("http://localhost:5000/api/ARZ/user/login", data);
  return response.data;
});

export const signup = createAsyncThunk("user/signup", async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/ARZ/user/signup", formData);
    return response.data; // Assuming response.data is the expected data on success
  } catch (error) {
    console.error('Error while signing up:', error);
    throw error; // Rethrow the error to be caught elsewhere if necessary
  }
});


export const getme = createAsyncThunk("user/getme", async () => {
    const response = await axios.get("http://localhost:5000/api/ARZ/user/profile", {
        headers: {
            authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
  });


  export const userUpdate = createAsyncThunk("user/Update", async ({ _id,data}, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/ARZ/user/${_id}`, data)
      return response.data; // Assuming response.data is the expected data on success
    } catch (error) {
      console.error('Error Thunk:', error);
      return rejectWithValue(error.response?.data || 'An error occurred while updating the user.');
    }
  });

  

