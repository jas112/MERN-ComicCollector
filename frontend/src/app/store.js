import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import comicReducer from '../features/comics/comicSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comics: comicReducer,
  },
});
