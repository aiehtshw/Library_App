import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons';
import {Filters} from '../../db/Enums';
import {LocalizedString} from '../../utils/languages';
import {Colors} from '../../utils/colors';
import styles from './styles';

type SearchBarProps = {
  chosenFilter: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  setChosenFilter: (filter: Filters) => void;
  setSortDecrease: () => void;
  setSortIncrease: () => void;
  sortDecrease: boolean;
  sortIncrease: boolean;
  text: string;
};

const Searchbar: React.FC<SearchBarProps> = ({
  chosenFilter,
  onTextChange,
  placeholder,
  setChosenFilter,
  setSortDecrease,
  setSortIncrease,
  sortDecrease,
  sortIncrease,
  text,
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const onFilterPress = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const setFilter = (newFilter: Filters) => {
    setChosenFilter(newFilter);
    setIsFilterVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AntDesign name="search1" size={18} color="black" />
        <View style={styles.textInput}>
          <TextInput
            value={text}
            onChangeText={onTextChange}
            placeholder={placeholder}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          onPress={onFilterPress}
          style={styles.pickerContainer}>
          {isFilterVisible ? (
            <Entypo name="chevron-up" size={24} color={Colors.Black} />
          ) : (
            <Entypo name="chevron-down" size={24} color={Colors.Black} />
          )}
          <Text>{chosenFilter}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.buttons} onPress={setSortDecrease}>
          <AntDesign
            name="arrowdown"
            size={24}
            color={sortDecrease ? Colors.BluePrimary : Colors.Black}
          />
          <Text>{LocalizedString.decrease}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttons} onPress={setSortIncrease}>
          <AntDesign
            name="arrowup"
            size={24}
            color={sortIncrease ? Colors.BluePrimary : Colors.Black}
          />
          <Text>{LocalizedString.increase}</Text>
        </TouchableOpacity>
        <View style={styles.filterItems}>
          {isFilterVisible ? (
            <View style={{height: 50}}>
              <Text onPress={() => setFilter(Filters.Author)}>
                {Filters.Author}
              </Text>
              <Text onPress={() => setFilter(Filters.BookName)}>
                {Filters.BookName}
              </Text>
              <Text onPress={() => setFilter(Filters.ISBN)}>
                {Filters.ISBN}
              </Text>
            </View>
          ) : (
            <View style={{height: 50}} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Searchbar;
