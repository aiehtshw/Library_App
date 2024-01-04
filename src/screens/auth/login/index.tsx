import React, {useReducer} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';
import {LocalizedString} from '../../../utils/languages';
import {LoginInputTypes} from '../../../db/Types';
import InputWithLabel from '../../../components/InputWithLabel';
import {UserUtils} from '../../../db/UserUtils';
import {useAppDispatch} from '../../../redux/store';
import {setIsLoggedIn} from '../../../redux/reducers/general/generalSlice';
import {setUser} from '../../../redux/reducers/user/userSlice';
import styles from './styles';
import LocalStorage from '../../../db';
import {BookUtils} from '../../../db/BookUtils';

type LoginProps = NativeStackScreenProps<AuthStackParamList, AuthScreens.Login>;

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [event, updateEvent] = useReducer(
    (prev: LoginInputTypes, next: LoginInputTypes) => {
      return {...prev, ...next};
    },
    {
      email: '',
      password: '',
    },
  );

  const inputAreas = [
    {
      isPassword: false,
      label: LocalizedString.eMail,
      onChangeText: (text: string) => updateEvent({email: text}),
      value: event.email,
    },
    {
      isPassword: true,
      label: LocalizedString.password,
      onChangeText: (text: string) => updateEvent({password: text}),
      value: event.password,
    },
  ];

  const onLoginPress = () => {
    if (event.email && event.password) {
      UserUtils.isValidUser(event.email, event.password, user => {
        if (user) {
          BookUtils.syncRedux();
          dispatch(setUser(user));
          dispatch(setIsLoggedIn(true));
        } else {
          //TODO: error statement
        }
      });
    } else {
      //TODO: error statement
    }
  };

  const onSignUpPress = () => {
    navigation.navigate(AuthScreens.SignUp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>{LocalizedString.login}</Text>
        <View style={styles.inputArea}>
          {inputAreas.map((value, index) => {
            return (
              <View key={index}>
                <InputWithLabel
                  isPassword={value.isPassword}
                  label={value.label}
                  onChangeText={value.onChangeText}
                  value={value.value}
                />
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>{LocalizedString.login}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
          <Text>{LocalizedString.signUp}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
