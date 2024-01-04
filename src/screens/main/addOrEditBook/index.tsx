import React, {useReducer, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InputWithLabel from '../../../components/InputWithLabel';
import {BookInfo} from '../../../db/Types';
import {LocalizedString} from '../../../utils/languages';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import styles from './styles';
import {Colors} from '../../../utils/colors';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {MainScreens, MainStackParamList} from '../../../navigation/routes';
import {BookUtils} from '../../../db/BookUtils';
import {useAppDispatch} from '../../../redux/store';
import {addBook, setBooks} from '../../../redux/reducers/books/booksSlice';

type AddBookProps = NativeStackScreenProps<
  MainStackParamList,
  MainScreens.AddBook | MainScreens.EditBook
>;

const AddOrEditBook: React.FC<AddBookProps> = ({navigation, route}) => {
  const BOOK_DETAIL = route.params?.bookInfo;

  const dispatch = useAppDispatch();
  const [event, updateEvent] = useReducer(
    (prev: BookInfo, next: BookInfo) => {
      return {...prev, ...next};
    },
    {
      author: BOOK_DETAIL?.author ?? [],
      description: BOOK_DETAIL?.description ?? '',
      genre: BOOK_DETAIL?.genre ?? '',
      name: BOOK_DETAIL?.name ?? '',
      isbn: BOOK_DETAIL?.isbn ?? '',
      bookCover: BOOK_DETAIL?.bookCover ?? '',
    },
  );
  const [author, setAuthor] = useState<string>('');
  const inputAreas = [
    {
      isPassword: false,
      label: LocalizedString.name,
      onChangeText: (text: string) => updateEvent({name: text}),
      value: event.name,
    },
    {
      isPassword: false,
      label: LocalizedString.isbn,
      onChangeText: (text: string) => updateEvent({isbn: text}),
      value: event.isbn,
    },
    {
      isPassword: false,
      label: LocalizedString.genre,
      onChangeText: (text: string) => updateEvent({genre: text}),
      value: event.genre,
    },
  ];

  const onAddOrEditBookPress = () => {
    if (
      event.isbn &&
      event.author &&
      event.name &&
      event.genre &&
      event.bookCover &&
      event.description
    ) {
      const addedBook = {
        author: event.author,
        description: event.description,
        genre: event.genre,
        name: event.name,
        isbn: event.isbn,
        bookCover: event.bookCover,
      };
      if (BOOK_DETAIL) {
        BookUtils.editBook(
          addedBook,
          () => {
            dispatch(addBook(addedBook));
            navigation.navigate(MainScreens.BookDetail, {bookInfo: addedBook});
          },
          () => {
            //TODO: Not edited
          },
        );
      } else {
        BookUtils.addBook(
          addedBook,
          () => {
            if (navigation.canGoBack()) {
              dispatch(addBook(addedBook));
              navigation.goBack();
            }
          },
          () => {
            //TODO: error statement
          },
        );
      }
    }
  };

  const onAddAuthorPress = () => {
    if (event.author) {
      const updatedAuthors = [...event.author, author];
      setAuthor('');
      updateEvent({author: updatedAuthors});
    }
  };

  const onDeleteAuthorPress = (author: string) => {
    let temp = event.author;

    if (temp) {
      temp = temp.filter(item => item !== author);
      updateEvent({author: temp});
    }
  };

  const onUploadFromDevicePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      updateEvent({bookCover: result.assets[0].uri});
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.inputArea}>
          {inputAreas.map((value, index) => {
            return (
              <View key={index}>
                <InputWithLabel
                  isPassword={value.isPassword}
                  label={value.label}
                  onChangeText={value.onChangeText}
                  value={value.value}
                  editable={
                    BOOK_DETAIL && value.label === LocalizedString.isbn
                      ? false
                      : undefined
                  }
                />
              </View>
            );
          })}
          <Text style={styles.label}>{LocalizedString.bookCover}</Text>
          {event.bookCover && (
            <Image source={{uri: event.bookCover}} style={styles.photo} />
          )}
          <TouchableOpacity
            style={[
              styles.uploadFromDevice,
              event.bookCover ? {marginTop: 8} : undefined,
            ]}
            onPress={onUploadFromDevicePress}>
            <AntDesign name="folder1" size={24} color="black" />
            <Text style={styles.uploadFromDeviceText}>
              {LocalizedString.uploadFromDevice}
            </Text>
          </TouchableOpacity>
          <Text style={styles.label}>{LocalizedString.author}</Text>
          <View style={styles.addAuthorContainer}>
            <TextInput
              style={styles.inputContainer}
              value={author}
              onChangeText={setAuthor}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={onAddAuthorPress}>
              <AntDesign name="plus" size={24} color={Colors.Black} />
            </TouchableOpacity>
          </View>
          {event.author &&
            event.author.map((item, index) => {
              return (
                <View style={styles.authorItem} key={index}>
                  <Text>{item}</Text>
                  <TouchableOpacity
                    style={{marginLeft: 8}}
                    onPress={() => onDeleteAuthorPress(item)}>
                    <Entypo name="cross" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            })}
          <Text style={styles.label}>{LocalizedString.description}</Text>
          <View style={styles.description}>
            <TextInput
              value={event.description}
              onChangeText={text => updateEvent({description: text})}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={styles.addBookButton}
            onPress={onAddOrEditBookPress}>
            <Text style={styles.addBookText}>
              {BOOK_DETAIL
                ? LocalizedString.saveChanges
                : LocalizedString.addBook}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddOrEditBook;
