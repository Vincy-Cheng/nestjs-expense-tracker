import { AxiosResponse } from 'axios';
import { IUserInfo } from '../types';

export interface User {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token?: string;
  user?: IUserInfo;
  status: number;
  error?: AxiosResponse;
}
