import React, {useReducer} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';
import {LocalizedString} from '../../../utils/languages';
import {LoginInputTypes} from '../../../db/Types';
import styles from './styles';

type LoginProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.Login>;

const Login: React.FC<LoginProps> = () => {
  const [event, updateEvent] = useReducer(
    (prev: LoginInputTypes, next: LoginInputTypes) => {
      return {...prev, ...next};
    },
    {
      email: '',
      password: '',
    },
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>{LocalizedString.login}</Text>
        <View style={styles.inputArea}>
          <Text style={styles.label}>{LocalizedString.eMail}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={event.email}
              onChangeText={text => updateEvent({email: text})}
            />
          </View>
          <Text style={styles.label}>{LocalizedString.password}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={event.password}
              onChangeText={text => updateEvent({password: text})}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{LocalizedString.login}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton}>
          <Text>{LocalizedString.signUp}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
