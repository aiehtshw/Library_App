import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';

export default StyleSheet.create({
  addAuthorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addBookButton: {
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 20,
    backgroundColor: Colors.BluePrimary,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },

  addBookText: {
    color: Colors.White,
  },

  authorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  description: {
    borderRadius: 4,
    borderColor: Colors.Gray700,
    borderWidth: 0.4,
    paddingVertical: 8,
  },

  inputArea: {
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    paddingBottom: 20,
  },

  inputContainer: {
    flex: 1,
    borderRadius: 4,
    borderColor: Colors.Gray700,
    borderWidth: 0.4,
    paddingVertical: 8,
  },

  label: {
    fontWeight: '300',
    fontSize: 16,
    marginVertical: 10,
    paddingVertical: 8,
  },

  photo: {
    width: 200,
    height: 200,
  },

  uploadFromDevice: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  uploadFromDeviceText: {
    marginLeft: 8,
  },
});
