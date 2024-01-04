import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.Gray300,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  content: {
    flexDirection: 'row',
  },

  filter: {},

  filterItems: {
    alignItems: 'flex-end',
    marginRight: 20,
    width: 100,
  },

  menu: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInput: {
    flex: 2,
  },
});
