import {combineReducers} from '@reduxjs/toolkit';
import generalSlice from './general/generalSlice';
import userSlice from './user/userSlice';
import booksSlice from './books/booksSlice';

const rootReducer = combineReducers({
  book: booksSlice,
  general: generalSlice,
  user: userSlice,
});

export default rootReducer;
