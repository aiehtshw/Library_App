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
    // Reducer function to add a book to the state
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    // Reducer function to set the entire books array
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: () => {},
});

export const {addBook, setBooks} = booksSlice.actions;

export default booksSlice.reducer;
