import React from 'react';
import {Text, View} from 'react-native';
import {
  AuthScreens,
  AuthStackParamList,
  MainScreens,
  MainStackParamList,
} from '../../../navigation/routes';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

type BookDetailProps = NativeStackScreenProps<
  MainStackParamList,
  MainScreens.BookDetail
>;

const BookDetail: React.FC<BookDetailProps> = () => {
  return (
    <View>
      <Text>Empty</Text>
    </View>
  );
};

export default BookDetail;
