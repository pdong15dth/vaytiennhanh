// import localStorageConstaint from "./constants/constants";

import { LoginDataModel } from "../../models/AdminDataResult";

class LocalStorageKey {
  protected ACCESS_TOKEN = "ACCESS_TOKEN";
  protected USER_INFOR = "USER_INFOR";
}

class BaseStorage<T> {
  private key: string;

  constructor(_key: string) {
    this.key = _key;
  }

  set = (value: T): void => {
    const dataString = JSON.stringify(value);
    localStorage.setItem(this.key, dataString);
  };

  get = (): T => {
    const dataString = localStorage.getItem(this.key);
    return JSON.parse(dataString);
  };

  remove = (): void => {
    localStorage.removeItem(this.key);
  };
}

class LocalStorageService extends LocalStorageKey {
  constructor() {
    super();
  }

  clearLocalStorage = (): void => {
    localStorage.clear();
  };

  /**
   * access token storage
   */

  accessToken: BaseStorage<string> = new BaseStorage<string>(this.ACCESS_TOKEN);

  /**
   * user info
   */

  userInfor: BaseStorage<LoginDataModel| LoginDataModel> = new BaseStorage(this.USER_INFOR);
}

const localStorageService = new LocalStorageService();

export default localStorageService;
