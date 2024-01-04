import React, {useReducer} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';
import {LocalizedString} from '../../../utils/languages';
import {LoginInputTypes} from '../../../db/Types';
import InputWithLabel from '../../../components/InputWithLabel';
import {UserUtils} from '../../../db/UserUtils';
import {useAppDispatch} from '../../../redux/store';
import {
  setIsLoggedIn,
  showFlashMessage,
} from '../../../redux/reducers/general/generalSlice';
import {setUser} from '../../../redux/reducers/user/userSlice';
import {BookUtils} from '../../../db/BookUtils';
import {UserTypes} from '../../../db/Enums';
import {MessageTypes} from '../../../redux/reducers/general/generalnterface';
import {isAndroid, isIos} from '../../../utils/config';
import styles from './styles';

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

  const onContinueWithAdminPress = () => {
    BookUtils.syncRedux();
    dispatch(
      setUser({
        title: UserTypes.Admin,
      }),
    );
    dispatch(setIsLoggedIn(true));
  };

  const onContinueWithGuestPress = () => {
    BookUtils.syncRedux();
    dispatch(
      setUser({
        title: UserTypes.Guest,
      }),
    );
    dispatch(setIsLoggedIn(true));
  };

  const onLoginPress = () => {
    if (event.email && event.password) {
      UserUtils.isValidUser(event.email, event.password, user => {
        if (user) {
          BookUtils.syncRedux();
          dispatch(setUser(user));
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(
            showFlashMessage({
              message: LocalizedString.invalidLogin,
              messageType: MessageTypes.Fail,
            }),
          );
        }
      });
    } else {
      dispatch(
        showFlashMessage({
          message: LocalizedString.emptyField,
          messageType: MessageTypes.Fail,
        }),
      );
    }
  };

  const onSignUpPress = () => {
    navigation.navigate(AuthScreens.SignUp);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isAndroid() && <StatusBar />}
      <View style={styles.content}>
        <KeyboardAwareScrollView
          contentContainerStyle={
            isIos() && {justifyContent: 'center', height: '100%'}
          }>
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
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onContinueWithAdminPress}>
            <Text>{LocalizedString.continueWithAdmin}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onContinueWithGuestPress}>
            <Text>{LocalizedString.continueWithGuest}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
            <Text>{LocalizedString.signUp}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
