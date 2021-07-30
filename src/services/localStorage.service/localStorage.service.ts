// import localStorageConstaint from "./constants/constants";

import { LoginDataModel } from "../../models/AdminDataResult";
import { CountRequest } from "../../models/CountRequest";

class LocalStorageKey {
  protected ACCESS_TOKEN = "ACCESS_TOKEN";
  protected USER_INFOR = "USER_INFOR";
  protected COUNT_REQUEST = "COUNT_REQUEST";
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

  /**
   * count request
   */

  countRequest: BaseStorage<CountRequest> = new BaseStorage(this.COUNT_REQUEST);
}

const localStorageService = new LocalStorageService();

export default localStorageService;
