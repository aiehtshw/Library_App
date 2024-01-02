import AsyncStorage from '@react-native-async-storage/async-storage';
import {debugLog, debugLogError} from '../utils/helpers/Log';

class LocalStorage {
  static USER_INFO = 'usr';
  static WELCOME_VISIBLE = 'wv';
  static USR_TKN = 'usrtkn';
  static async storeData(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      debugLog(
        'Writing to storage with key: ' + key + ', value : ' + jsonValue,
      );
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      debugLogError(e);
    }
  }

  static async getData<T>(key: string): Promise<T> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      debugLog(
        'Reading from storage with key: ' + key + ' value : ' + jsonValue,
      );
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      debugLogError(e);
      throw new Error('Error occurred while reading from State Manager.');
    }
  }

  static async removeData(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      debugLogError(e);
      return false;
    }
  }
}

export default LocalStorage;
