import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import advertismentReducer from './slices/advertismentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    advertisment: advertismentReducer,
  },
});

export default store;
