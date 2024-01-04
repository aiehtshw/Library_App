import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreens, MainStackParamList} from '../routes';
import Dashboard from '../../screens/main/dashboard';
import BookDetail from '../../screens/main/bookDetail';
import AddOrEditBook from '../../screens/main/addOrEditBook';
import React from 'react';
import {Button} from 'react-native';
import {LocalizedString} from '../../utils/languages';
import {Colors} from '../../utils/colors';

const Stack = createNativeStackNavigator<MainStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MainScreens.Dashboard}>
      <Stack.Screen
        name={MainScreens.AddBook}
        component={AddOrEditBook}
        options={({navigation}) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title={LocalizedString.back}
              color="#000"
            />
          ),
          presentation: 'containedModal',
          animation: 'slide_from_bottom',
        })}
      />
      <Stack.Screen name={MainScreens.BookDetail} component={BookDetail} />
      <Stack.Screen
        name={MainScreens.Dashboard}
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={MainScreens.EditBook}
        component={AddOrEditBook}
        options={({navigation}) => ({
          headerLeft: () => (
            <Button
              onPress={() => navigation.goBack()}
              title={LocalizedString.back}
              color={Colors.Black}
            />
          ),
          presentation: 'containedModal',
          animation: 'slide_from_bottom',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
