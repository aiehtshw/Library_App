import {UserTypes} from './Enums';

export type BookInfo = {
  author?: string[];
  description?: string;
  genre?: string;
  name?: string;
  isbn?: string;
  bookCover?: string;
};

export type BooksInfo = {
  books: BookInfo[];
};

export type LoginInputTypes = {
  email?: string;
  password?: string;
};

export type SignUpInputTypes = {
  email?: string;
  isAdmin?: boolean;
  password?: string;
  userName?: string;
};

export type UserInfo = {
  email: string;
  password: string;
  title: UserTypes;
  userName: string;
};
