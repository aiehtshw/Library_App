import {createSlice} from '@reduxjs/toolkit';
import {BooksInfo} from '../../../db/Types';

const REDUCER_NAME = 'Books';

const initialState: BooksInfo = {
  books: [],
};

const booksSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: () => {},
});

export const {addBook, setBooks} = booksSlice.actions;

export default booksSlice.reducer;
