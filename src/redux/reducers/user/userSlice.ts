import {createSlice} from '@reduxjs/toolkit';
import {UserInfo} from '../../../db/Types';
import {UserTypes} from '../../../db/Enums';

const REDUCER_NAME = 'User';

const initialState: UserInfo = {
  email: '',
  password: '',
  title: UserTypes.User,
  userName: '',
};

const userSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    // Reducer function to set the entire user information
    setUser: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: () => {},
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
