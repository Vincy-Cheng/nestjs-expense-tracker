import { EIconName } from '../common/icon-name.enum';

export interface IUser {
  username: string;
  password: string;
}

export interface IWallet {
  id: number;
  name: string;
  currency: string;
}

export type TCategoryType = 'expense' | 'income';

export interface ICategory {
  id: number;
  name: string;
  icon: EIconName;
  enable: boolean;
  type: TCategoryType;
}

export interface IRecord {
  id: number;
  price: number;
  remarks: string;
}
export interface LoginResponse {
  access_token: string;
  user: IUserInfo;
}

export interface ICreateWallet extends IWallet {
  userId: number;
}

export interface ICreateCategory extends ICategory {
  userId: number;
}

export interface IUserInfo {
  id: number;
  username: string;
  email: string;
  categoryOrder: number[];
}
