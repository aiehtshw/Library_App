import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';

export default StyleSheet.create({
  addBook: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: Colors.BluePrimary,
    padding: 10,
    borderRadius: 34,
  },

  container: {
    flex: 1,
    marginHorizontal: 10,
  },

  content: {},

  headerText: {
    fontWeight: '500',
    fontSize: 16,
  },

  searchBar: {
    marginTop: 10,
  },
});
