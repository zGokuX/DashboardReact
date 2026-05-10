import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/counterSlice'
import inputReducer from '../slices/NameSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    userName: inputReducer,
  },
});