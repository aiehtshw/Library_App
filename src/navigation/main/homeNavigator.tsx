import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import ForgotPassword from '../../screens/auth/forgotPassword';
import {AuthScreens, MainScreens, MainStackParamList} from '../routes';
import Login from '../../screens/auth/login';
import SignUp from '../../screens/auth/signUp';
import Dashboard from '../../screens/main/dashboard';
import BookDetail from '../../screens/main/bookDetail';

const Stack = createNativeStackNavigator<MainStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MainScreens.Dashboard}>
      <Stack.Screen name={MainScreens.BookDetail} component={BookDetail} />
      <Stack.Screen name={MainScreens.Dashboard} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
