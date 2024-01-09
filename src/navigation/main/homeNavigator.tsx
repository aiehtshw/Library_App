import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
import {MainScreens, MainStackParamList} from '../routes';
import Dashboard from '../../screens/main/dashboard';
import BookDetail from '../../screens/main/bookDetail';
import AddOrEditBook from '../../screens/main/addOrEditBook';
import {LocalizedString} from '../../utils/languages';
import {Colors} from '../../utils/colors';

const Stack = createNativeStackNavigator<MainStackParamList>();

/**
 * Navigator handling screens within the main section of the application.
 * It includes Dashboard, BookDetail, AddOrEditBook, and EditBook screens.
 */
const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MainScreens.Dashboard}>
      <Stack.Screen
        name={MainScreens.AddBook}
        component={AddOrEditBook}
        options={({navigation}) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{backgroundColor: Colors.White}}>
              <Text style={{fontSize: 15}}>{LocalizedString.back}</Text>
            </TouchableOpacity>
          ),
          presentation: 'containedModal',
          animation: 'slide_from_bottom',
          title: 'Kitap Ekle',
        })}
      />
      <Stack.Screen
        name={MainScreens.BookDetail}
        component={BookDetail}
        options={{title: 'Kitap Detay'}}
      />
      <Stack.Screen
        name={MainScreens.Dashboard}
        component={Dashboard}
        options={{headerShown: false, title: 'Ana Sayfa'}}
      />
      <Stack.Screen
        name={MainScreens.EditBook}
        component={AddOrEditBook}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{backgroundColor: Colors.White}}>
              <Text>{LocalizedString.back}</Text>
            </TouchableOpacity>
          ),
          presentation: 'containedModal',
          animation: 'slide_from_bottom',
          title: 'Kitap Düzenle',
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
