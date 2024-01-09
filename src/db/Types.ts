import {UserTypes} from './Enums';

/**
 * Defines the structure of individual book information.
 */
export type BookInfo = {
  author?: string[];
  description?: string;
  genre?: string;
  name?: string;
  isbn?: string;
  bookCover?: string;
};

/**
 * Defines the structure of a collection of books.
 */
export type BooksInfo = {
  books: BookInfo[];
};

/**
 * Defines the structure of input data for user login.
 */
export type LoginInputTypes = {
  email?: string;
  password?: string;
};

/**
 * Defines the structure of input data for user signup/registration.
 */
export type SignUpInputTypes = {
  email?: string;
  isAdmin?: boolean;
  password?: string;
  userName?: string;
};

/**
 * Defines the structure of user information.
 */
export type UserInfo = {
  email: string;
  password: string;
  title: UserTypes;
  userName: string;
};
