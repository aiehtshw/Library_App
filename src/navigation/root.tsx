import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import {useAppSelector} from '../redux/store';
import {AUTH_NAVIGATOR, HOME_NAVIGATOR} from './routes';
import HomeNavigator from './main/homeNavigator';
import AuthNavigator from './auth/authNavigator';

/**
 * Component managing the root navigation flow of the application.
 * It displays a splash screen for a specified duration and then navigates
 * either to the authenticated screens (HomeNavigator) or the authentication flow (AuthNavigator).
 */
const Root = () => {
  const RootStack = createNativeStackNavigator();
  const [splashVisibility, setSplashVisibility] = useState<boolean>(true);
  const isLoggedIn = useAppSelector(state => state.general.isLoggedIn);

  // Hides the splash screen after a specified duration
  useEffect(() => {
    setTimeout(() => {
      setSplashVisibility(false);
    }, 2000);
  }, []);

  return splashVisibility ? (
    <Splash />
  ) : (
    // Once splash screen is hidden, navigate to the appropriate navigator based on login status
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
      ) : (
        <RootStack.Screen name={AUTH_NAVIGATOR} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default Root;
