import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

export default StyleSheet.create({
  authorsText: {
    fontWeight: '400',
    fontSize: 13,
    marginBottom: 5,
  },

  container: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.LightBlue,
  },

  headerText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },

  isbnText: {
    fontWeight: '300',
    fontSize: 13,
    marginBottom: 5,
  },

  photo: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  rightSide: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingLeft: 10,
  },
});
