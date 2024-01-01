import React from 'react';

import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';

type ForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.ForgotPassword
>;

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

export default ForgotPassword;
