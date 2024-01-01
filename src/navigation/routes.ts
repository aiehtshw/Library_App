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
  BookDetail = 'BookDetail',
  Dashboard = 'Dashboard',
}

export type MainStackParamList = {
  BookDetail: undefined;
  Dashboard: undefined;
};
