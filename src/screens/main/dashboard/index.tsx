import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
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
import styles from './styles';

type DashboardProps = NativeStackScreenProps<
  MainStackParamList,
  MainScreens.Dashboard
>;

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const userState = useAppSelector(state => state.user);
  const bookState = useAppSelector(state => state.book.books);
  const [searchText, setSearchText] = useState<string>('');
  const [books, setBooks] = useState<BookInfo[]>();
  const [chosenFilter, setChosenFilter] = useState<Filters>(Filters.BookName);
  const [sortIncrease, setSortIncrease] = useState<boolean>(false);
  const [sortDecrease, setSortDecrease] = useState<boolean>(false);

  useEffect(() => {
    setBooks(bookState);
    setSortDecrease(false);
    setSortIncrease(false);
  }, [bookState]);

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

  useEffect(() => {
    if (sortIncrease) {
      setBooks(sortIncreaseBooks());
    } else if (sortDecrease) {
      setBooks(sortIncreaseBooks()?.reverse());
    } else {
      setBooks(bookState);
    }
  }, [sortDecrease, sortIncrease, chosenFilter]);

  const onAddBookPress = () => {
    navigation.navigate(MainScreens.AddBook);
  };

  const onBookItemPress = (item: BookInfo) => {
    if (books) {
      navigation.navigate(MainScreens.BookDetail, {bookInfo: item});
    }
  };

  const setFilter = (chosen: Filters) => {
    setChosenFilter(chosen);
  };

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

  const startSortDecrease = () => {
    if (!sortDecrease) {
      sortIncrease && setSortIncrease(false);
      setSortDecrease(true);
    } else {
      setSortDecrease(false);
    }
  };

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
