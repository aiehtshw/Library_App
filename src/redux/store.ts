import {UnknownAction, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

type AppState = ReturnType<typeof rootReducer>;
type TypedDispatch<T> = ThunkDispatch<T, any, UnknownAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
