import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FlashMessage, GeneralState, MessageTypes} from './generalnterface';

const REDUCER_NAME = 'General';

const initialState: GeneralState = {
  isLoggedIn: false,
  flashMessage: {
    visibility: false,
    message: '',
    messageType: MessageTypes.Success,
  },
};

const generalSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    hideFlashMessage: state => {
      state.flashMessage.visibility = false;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    showFlashMessage: (state, action: PayloadAction<FlashMessage>) => {
      state.flashMessage = {...action.payload, visibility: true};
    },
  },
  extraReducers: () => {},
});

export const {hideFlashMessage, setIsLoggedIn, showFlashMessage} =
  generalSlice.actions;

export default generalSlice.reducer;
