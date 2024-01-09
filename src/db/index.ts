import AsyncStorage from '@react-native-async-storage/async-storage';
import {debugLog, debugLogError} from '../utils/helpers/Log';

/**
 * Utility class for handling AsyncStorage operations.
 * Provides methods for storing, retrieving, and removing data from AsyncStorage.
 */
class LocalStorage {
  /**
   * Stores data in AsyncStorage under a specified key.
   * @param {string} key - The key under which the data will be stored.
   * @param {any} value - The data to be stored.
   */
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

  /**
   * Retrieves data from AsyncStorage based on the provided key.
   * @param {string} key - The key associated with the stored data.
   * @returns {Promise<T | null>} - The retrieved data, or null if not found.
   */
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

  /**
   * Removes data from AsyncStorage based on the provided key.
   * @param {string} key - The key associated with the data to be removed.
   * @returns {Promise<boolean>} - Indicates whether the removal was successful (true) or not (false).
   */
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
