import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './src/navigation/root';
import store from './src/redux/store';
import FlashMessage from './src/components/FlashMessage';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root />
          <FlashMessage />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
