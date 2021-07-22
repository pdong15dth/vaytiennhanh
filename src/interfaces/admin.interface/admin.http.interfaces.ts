import { LoginDataModel } from "../../models/AdminDataResult";

export type TReqLogin = {
  username: string;
  password: string;
};

export type TResData<T> = {
  data: T;
  status: number;
  message: string;
  isSuccess: boolean;
};

export interface IUserInfo {
  isValidAdmin: boolean;
  address: string;
  available: boolean;
  created_at: string;
  date_of_birth: string;
  email: string;
  fullname: string;
  is_delete: boolean;
  password: string;
  phone: string;
  role: string;
  sex: string;
  username: string;
}

export interface ILoginResponse {
  infoUser: any;
  token: string;
  success: boolean;
}

// export type T
