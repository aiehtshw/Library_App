import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {AntDesign} from '@expo/vector-icons';
import {MainScreens, MainStackParamList} from '../../../navigation/routes';
import {LocalizedString} from '../../../utils/languages';
import {useAppSelector} from '../../../redux/store';
import {Filters, UserTypes} from '../../../db/Enums';
import Searchbar from '../../../components/Searchbar';
import {Colors} from '../../../utils/colors';
import BookItem from '../../../components/BookItem';
import {BookInfo} from '../../../db/Types';
import {isAndroid} from '../../../utils/config';
import styles from './styles';

type DashboardProps = NativeStackScreenProps<
  MainStackParamList,
  MainScreens.Dashboard
>;

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  // Accessing user and book state from Redux store
  const userState = useAppSelector(state => state.user);
  const bookState = useAppSelector(state => state.book.books);

  // State variables for search, books, filters, and sorting
  const [searchText, setSearchText] = useState<string>('');
  const [books, setBooks] = useState<BookInfo[]>();
  const [chosenFilter, setChosenFilter] = useState<Filters>(Filters.BookName);
  const [sortIncrease, setSortIncrease] = useState<boolean>(false);
  const [sortDecrease, setSortDecrease] = useState<boolean>(false);

  // useEffect to update books when bookState changes
  useEffect(() => {
    setBooks(bookState);
    setSortDecrease(false);
    setSortIncrease(false);
  }, [bookState]);

  // useEffect to filter books based on search text and chosen filter
  useEffect(() => {
    if (searchText) {
      switch (chosenFilter) {
        case Filters.Author:
          setBooks(
            books?.filter(
              item => item.author?.some(author => author.includes(searchText)),
            ),
          );
          break;
        case Filters.BookName:
          setBooks(books?.filter(item => item.name?.includes(searchText)));
          break;
        case Filters.ISBN:
          setBooks(books?.filter(item => item.isbn?.includes(searchText)));
          break;
      }
    } else {
      setBooks(bookState);
    }
  }, [searchText]);

  // useEffect to sort books based on chosen filter and sorting direction
  useEffect(() => {
    if (sortIncrease) {
      setBooks(sortIncreaseBooks());
    } else if (sortDecrease) {
      setBooks(sortIncreaseBooks()?.reverse());
    } else {
      setBooks(bookState);
    }
  }, [sortDecrease, sortIncrease, chosenFilter]);

  // Function to handle navigation to the AddBook screen
  const onAddBookPress = () => {
    navigation.navigate(MainScreens.AddBook);
  };

  // Function to handle navigation to BookDetail when a book item is pressed
  const onBookItemPress = (item: BookInfo) => {
    if (books) {
      navigation.navigate(MainScreens.BookDetail, {bookInfo: item});
    }
  };

  // Function to set the chosen filter for search
  const setFilter = (chosen: Filters) => {
    setChosenFilter(chosen);
  };

  // Function to set greeting based on user type
  const setGreeting = (): string => {
    switch (userState.title) {
      case UserTypes.User:
        return userState.userName;
      case UserTypes.Admin:
        return LocalizedString.admin;
      case UserTypes.Guest:
        return LocalizedString.guest;
    }
  };

  // Function to sort books in ascending order
  const sortIncreaseBooks = () => {
    switch (chosenFilter) {
      case Filters.Author:
        return books?.slice().sort((a, b) => {
          const authorA = (a?.author || []).join(',');
          const authorB = (b?.author || []).join(',');
          return authorA.localeCompare(authorB);
        });
      case Filters.BookName:
        return books?.slice().sort((a, b) => {
          const nameA = a?.name || '';
          const nameB = b?.name || '';
          return nameA.localeCompare(nameB);
        });
      case Filters.ISBN:
        return books?.slice().sort((a, b) => {
          const isbnA = a?.isbn || '';
          const isbnB = b?.isbn || '';
          return isbnA.localeCompare(isbnB);
        });
    }
  };

  // Function to handle sorting directions
  const startSortDecrease = () => {
    if (!sortDecrease) {
      sortIncrease && setSortIncrease(false);
      setSortDecrease(true);
    } else {
      setSortDecrease(false);
    }
  };

  // Function to handle sorting directions
  const startSortIncrease = () => {
    if (!sortIncrease) {
      sortDecrease && setSortDecrease(false);
      setSortIncrease(true);
    } else {
      setSortIncrease(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isAndroid() && <StatusBar />}
      <View style={styles.content}>
        <Text style={styles.headerText}>
          {LocalizedString.hello} {setGreeting()},
        </Text>
        <View style={styles.searchBar}>
          <Searchbar
            chosenFilter={chosenFilter}
            setChosenFilter={text => setFilter(text)}
            setSortDecrease={() => startSortDecrease()}
            setSortIncrease={() => startSortIncrease()}
            sortIncrease={sortIncrease}
            sortDecrease={sortDecrease}
            text={searchText}
            onTextChange={setSearchText}
            placeholder={LocalizedString.whatAreYouSearch}
          />
        </View>
      </View>
      <ScrollView>
        {books &&
          books.map((item, index) => {
            return (
              item.author &&
              item.isbn &&
              item.bookCover &&
              item.genre &&
              item.name &&
              item.description && (
                <TouchableOpacity
                  key={index}
                  style={{marginTop: 16}}
                  onPress={() => onBookItemPress(item)}
                  activeOpacity={0.4}>
                  <BookItem
                    author={item.author}
                    name={item.name}
                    isbn={item.isbn}
                    bookCover={item.bookCover}
                  />
                </TouchableOpacity>
              )
            );
          })}
      </ScrollView>

      {userState.title !== UserTypes.Guest && (
        <TouchableOpacity style={styles.addBook} onPress={onAddBookPress}>
          <AntDesign name="plus" size={24} color={Colors.White} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Dashboard;
