import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';

export default StyleSheet.create({
  authorsText: {
    fontWeight: '400',
    fontSize: 13,
    marginBottom: 5,
  },

  container: {
    flex: 1,
    marginHorizontal: 10,
  },

  content: {
    flexDirection: 'row',
    marginTop: 10,
  },

  deleteBook: {
    position: 'absolute',
    right: 20,
    bottom: 150,
    backgroundColor: Colors.Red,
    padding: 10,
    borderRadius: 34,
  },

  descriptionText: {
    fontWeight: '300',
    fontSize: 13,
    marginBottom: 5,
  },

  editBook: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: Colors.BluePrimary,
    padding: 10,
    borderRadius: 34,
  },

  genreText: {
    fontWeight: '300',
    fontSize: 13,
    marginBottom: 5,
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

  label: {
    fontWeight: '300',
    fontSize: 16,
    marginVertical: 10,
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
