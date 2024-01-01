import {combineReducers} from '@reduxjs/toolkit';
import generalSlice from './general/generalSlice';

const rootReducer = combineReducers({
  general: generalSlice
});

export default rootReducer;
