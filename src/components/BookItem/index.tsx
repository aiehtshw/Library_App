import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

type BookItemProps = {
  author: string[];
  isbn: string;
  name: string;
  bookCover: string;
};
const BookItem: React.FC<BookItemProps> = ({author, isbn, name, bookCover}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: bookCover}} style={styles.photo} />
      <View style={styles.rightSide}>
        <Text style={styles.headerText}>{name}</Text>
        {author.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.authorsText}>* {item}</Text>
            </View>
          );
        })}
        <Text style={styles.isbnText}>{isbn}</Text>
      </View>
    </View>
  );
};

export default BookItem;
