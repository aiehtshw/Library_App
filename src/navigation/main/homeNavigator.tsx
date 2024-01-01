import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreens, MainStackParamList} from '../routes';
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
