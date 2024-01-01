import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';

type LoginProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.Login>;

const Login: React.FC<LoginProps> = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

export default Login;
