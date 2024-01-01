import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GeneralState } from './generalnterface';

const REDUCER_NAME = 'General';

const initialState: GeneralState = {
  isLoggedIn: false
};

const generalSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setIsLoggedIn} = generalSlice.actions;

export default generalSlice.reducer;
