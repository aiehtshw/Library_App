import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {BookInfo} from '../../../db/Types';
import {LocalizedString} from '../../../utils/languages';
import {MainScreens, MainStackParamList} from '../../../navigation/routes';
import {Colors} from '../../../utils/colors';
import {useAppSelector} from '../../../redux/store';
import {UserTypes} from '../../../db/Enums';
import {BookUtils} from '../../../db/BookUtils';
import {isAndroid} from '../../../utils/config';
import styles from './styles';

type BookDetailProps = NativeStackScreenProps<
  MainStackParamList,
  MainScreens.BookDetail
>;

const BookDetail: React.FC<BookDetailProps> = ({navigation, route}) => {
  const BOOK_DETAIL: BookInfo = route.params.bookInfo;
  const userState = useAppSelector(state => state.user);
  const onEditBookPress = () => {
    navigation.navigate(MainScreens.EditBook, {bookInfo: BOOK_DETAIL});
  };

  const onDeleteBookPress = () => {
    BookUtils.deleteFromStorage(BOOK_DETAIL);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isAndroid() && <StatusBar />}
      <View style={styles.content}>
        <Image source={{uri: BOOK_DETAIL.bookCover}} style={styles.photo} />
        <View style={styles.rightSide}>
          <Text style={styles.headerText}>{BOOK_DETAIL.name}</Text>
          {BOOK_DETAIL.author &&
            BOOK_DETAIL.author.map((item, index) => {
              return (
                <View key={index}>
                  <Text style={styles.authorsText}>* {item}</Text>
                </View>
              );
            })}
          <Text style={styles.isbnText}>{BOOK_DETAIL.isbn}</Text>
        </View>
      </View>
      <Text style={styles.label}>{LocalizedString.genre}</Text>
      <Text style={styles.genreText}>* {BOOK_DETAIL.genre}</Text>
      <Text style={styles.label}>{LocalizedString.description}</Text>
      <Text style={styles.descriptionText}>{BOOK_DETAIL.description}</Text>
      {userState.title === UserTypes.Admin && (
        <TouchableOpacity style={styles.deleteBook} onPress={onDeleteBookPress}>
          <MaterialCommunityIcons
            name="delete"
            size={24}
            color={Colors.White}
          />
        </TouchableOpacity>
      )}
      {userState.title !== UserTypes.Guest && (
        <TouchableOpacity style={styles.editBook} onPress={onEditBookPress}>
          <Feather name="edit-3" size={24} color={Colors.White} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default BookDetail;
