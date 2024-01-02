import {UserTypes} from './Enums';

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
