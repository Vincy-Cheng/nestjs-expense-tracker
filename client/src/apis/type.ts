import { AxiosResponse } from 'axios';
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
  icon: string;
}

export interface ErrorResponse {
  status: number;
  error?: AxiosResponse;
}

export interface LoginResponse {
  access_token: string;
  user: IUserInfo;
}

export interface RegisterResponse extends ErrorResponse {
  user?: IUserInfo;
}
