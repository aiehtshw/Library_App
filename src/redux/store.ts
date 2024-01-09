import {UnknownAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux';
import rootReducer from './reducers';

// Configure the Redux store using the combined rootReducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Define the type representing the entire application state
type AppState = ReturnType<typeof rootReducer>;

// Define a typed dispatch function for the Redux store actions
type TypedDispatch<T> = ThunkDispatch<T, any, UnknownAction>;

// Custom hook to get the typed dispatch function for actions
export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();

// Define the type representing the root state of the Redux store
type RootState = ReturnType<typeof store.getState>;

// Custom hook for using typed selectors with the RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
