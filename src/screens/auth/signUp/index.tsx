import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';

type SignUpProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.SignUp
>;

const SignUp: React.FC<SignUpProps> = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

export default SignUp;
