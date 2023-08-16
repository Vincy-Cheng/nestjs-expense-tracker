import { EIconName } from '../common/icon-name.enum';
import { IUserInfo } from '../types';

export interface IUser {
  username: string;
  password: string;
}

export interface IWallet {
  id: number;
  name: string;
  currency: string;
}

export interface ICategory {
  id: number;
  name: string;
  icon: EIconName;
  enable: boolean;
}
export interface LoginResponse {
  access_token: string;
  user: IUserInfo;
}

export interface ICreateWallet extends IWallet {
  userId: number;
}
