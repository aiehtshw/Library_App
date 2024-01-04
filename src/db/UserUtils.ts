import {UserInfo} from './Types';
import LocalStorage from './index';

export class UserUtils {
  private static USRS = 'usrs';
  private static users: UserInfo[] = [];

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

  static deleteUser = (user: UserInfo) => {
    this.users = this.users.filter(obj => obj !== user);
  };

  private static isEmailUsed = (email: string) => {
    const foundUser = this.users.find(user => user.email === email);
    return !!foundUser;
  };

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

  private static readUser = (onCallBack: () => void) => {
    LocalStorage.getData<UserInfo[]>(this.USRS).then(result => {
      this.users = result;
      onCallBack();
    });
  };
}
