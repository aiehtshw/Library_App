import React, { useEffect, useState } from 'react';
import Splash from '../screens/splash';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useAppSelector } from '../redux/store';
import { AUTH_NAVIGATOR, HOME_NAVIGATOR } from './routes';
import HomeNavigator from './main/homeNavigator';
import AuthNavigator from './auth/authNavigator';

const Root = () => {
  const RootStack = createNativeStackNavigator();
  const [splashVisibility, setSplashVisibility] = useState<boolean>(true);
  const isLoggedIn = useAppSelector(state => state.general.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisibility(false);
    }, 2000);
  }, []);

  return splashVisibility ? (
    <Splash />
  ) : (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
      ) : (
        <RootStack.Screen name={AUTH_NAVIGATOR} component={AuthNavigator}/>
      )}
    </RootStack.Navigator>
  );
};

export default Root;
