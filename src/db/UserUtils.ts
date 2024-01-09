import {UserInfo} from './Types';
import LocalStorage from './index';

/**
 * Utility class for managing user-related operations.
 */
export class UserUtils {
  private static USRS = 'usrs';
  private static users: UserInfo[] = [];

  /**
   * Adds a new user to the user list.
   * @param newUser - The information of the new user to be added.
   * @param onSuccess - Callback function invoked upon successful user addition.
   * @param onFail - Callback function invoked if adding the user fails.
   */
  static addUser = (
    newUser: UserInfo,
    onSuccess: () => void,
    onFail: () => void,
  ) => {
    UserUtils.readUser(() => {
      if (this.users) {
        if (!UserUtils.isEmailUsed(newUser.email)) {
          this.users.push(newUser);
          LocalStorage.storeData(UserUtils.USRS, this.users);
          onSuccess();
        } else {
          onFail();
        }
      } else {
        LocalStorage.storeData(UserUtils.USRS, [newUser]);
        onSuccess();
      }
    });
  };

  /**
   * Deletes a user from the user list.
   * @param user - The user to be deleted.
   */
  static deleteUser = (user: UserInfo) => {
    this.users = this.users.filter(obj => obj !== user);
  };

  /**
   * Checks if an email is already used by an existing user.
   * @param email - The email to check for uniqueness.
   * @returns {boolean} - Indicates if the email is already in use (true) or not (false).
   */
  private static isEmailUsed = (email: string) => {
    const foundUser = this.users.find(user => user.email === email);
    return !!foundUser;
  };

  /**
   * Validates user credentials (email and password).
   * @param email - The user's email for validation.
   * @param password - The user's password for validation.
   * @param onCallback - Callback function returning the validated user information or undefined.
   */
  static isValidUser = (
    email: string,
    password: string,
    onCallback: (user: UserInfo | undefined) => void,
  ) => {
    UserUtils.readUser(() => {
      if (this.users) {
        const foundUser = this.users.find(
          user => user.email === email && user.password === password,
        );
        onCallback(foundUser);
      }
    });
  };

  /**
   * Reads user data from Local Storage and updates the in-memory user list.
   * @param onCallBack - Callback function invoked after reading user data.
   */
  private static readUser = (onCallBack: () => void) => {
    LocalStorage.getData<UserInfo[]>(this.USRS).then(result => {
      this.users = result;
      onCallBack();
    });
  };
}
