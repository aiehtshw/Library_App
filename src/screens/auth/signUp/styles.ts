import {StyleSheet} from 'react-native';
import {Colors} from '../../../utils/colors';
export default StyleSheet.create({
  checkBoxContainer: {
    marginTop: 12,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
  },

  content: {
    marginHorizontal: 10,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  inputArea: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
    paddingBottom: 20,
  },

  inputContainer: {
    borderRadius: 4,
    borderColor: Colors.Gray700,
    borderWidth: 0.4,
    paddingVertical: 8,
  },

  label: {
    fontWeight: '300',
    fontSize: 16,
    marginVertical: 10,
  },

  loginButton: {
    alignSelf: 'center',
    paddingVertical: 10,
  },

  signUpButton: {
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 20,
    backgroundColor: Colors.BluePrimary,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },

  signUpButtonText: {
    color: Colors.White,
  },
});
