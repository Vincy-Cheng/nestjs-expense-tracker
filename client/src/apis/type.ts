import { AxiosResponse } from 'axios';
import { IUserInfo } from '../types';

export interface User {
  username: string;
  password: string;
}

export interface Wallet {
  id: number;
  name: string;
  currency: string;
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
