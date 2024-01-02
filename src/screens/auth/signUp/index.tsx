import React, {useReducer} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AuthScreens, AuthStackParamList} from '../../../navigation/routes';
import {LocalizedString} from '../../../utils/languages';
import {SignUpInputTypes, UserInfo} from '../../../db/Types';
import InputWithLabel from '../../../components/InputWithLabel';
import CheckBox from '../../../components/CheckBox';
import {UserTypes} from '../../../db/Enums';
import {UserUtils} from '../../../db/UserUtils';
import {useAppDispatch} from '../../../redux/store';
import {setUser} from '../../../redux/reducers/user/userSlice';
import {setIsLoggedIn} from '../../../redux/reducers/general/generalSlice';
import styles from './styles';

type SignUpProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthScreens.SignUp
>;

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [event, updateEvent] = useReducer(
    (prev: SignUpInputTypes, next: SignUpInputTypes) => {
      return {...prev, ...next};
    },
    {
      email: '',
      isAdmin: false,
      password: '',
      userName: '',
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
    {
      isPassword: false,
      label: LocalizedString.userName,
      onChangeText: (text: string) => updateEvent({userName: text}),
      value: event.userName,
    },
  ];

  const onCheckPress = () => {
    updateEvent({isAdmin: !event.isAdmin});
    console.log(event.isAdmin);
  };

  const onLoginPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onSignUpPress = () => {
    if (event.email && event.password && event.userName) {
      const userInfo: UserInfo = {
        email: event.email,
        password: event.password,
        title: event.isAdmin ? UserTypes.Admin : UserTypes.User,
        userName: event.userName,
      };
      UserUtils.addUser(
        userInfo,
        () => {
          dispatch(setUser(userInfo));
          dispatch(setIsLoggedIn(true));
        },
        () => {
          //TODO: we have this account
        },
      );
    } else {
      //TODO: error statement
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerText}>{LocalizedString.signUp}</Text>
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
        <View style={styles.checkBoxContainer}>
          <CheckBox
            onClick={onCheckPress}
            text={LocalizedString.continueWithAdmin}
            value={event.isAdmin}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={onSignUpPress}>
          <Text style={styles.signUpButtonText}>{LocalizedString.signUp}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text>{LocalizedString.login}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
