import {BookInfo} from '../db/Types';

// Constants defining names for navigators
export const AUTH_NAVIGATOR = 'AuthNavigator';
export const HOME_NAVIGATOR = 'TabNavigator';

export enum AuthScreens {
  ForgotPassword = 'ForgotPassword',
  Login = 'Login',
  SignUp = 'SignUp',
}

export type AuthStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
  SignUp: undefined;
};

export enum MainScreens {
  AddBook = 'AddBook',
  BookDetail = 'BookDetail',
  Dashboard = 'Dashboard',
  EditBook = 'EditBook',
}

export type MainStackParamList = {
  AddBook: undefined;
  BookDetail: {bookInfo: BookInfo};
  Dashboard: undefined;
  EditBook: {bookInfo: BookInfo};
};
