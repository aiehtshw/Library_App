import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../../screens/auth/forgotPassword';
import {AuthScreens, AuthStackParamList} from '../routes';
import Login from '../../screens/auth/login';
import SignUp from '../../screens/auth/signUp';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AuthScreens.Login}>
      <Stack.Screen
        name={AuthScreens.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen name={AuthScreens.Login} component={Login} />
      <Stack.Screen name={AuthScreens.SignUp} component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
