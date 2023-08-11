import axios, { AxiosResponse } from 'axios';
import { LoginResponse, RegisterResponse, IUser } from './type';
import { NewUser } from '../pages/RegisterPage';
import { IUserInfo } from '../types';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function signIn(user: IUser): Promise<LoginResponse> {
  const res = await Axios.post('/v1/auth/login', {
    ...user,
  });

  return res.data;
}

export async function register(newUser: NewUser): Promise<IUserInfo> {
  const res = await Axios.post('/v1/users', { ...newUser });

  return res.data;

  // try {
  //   const res: AxiosResponse<RegisterResponse> = await Axios.post('/v1/users', {
  //     ...newUser,
  //   });

  //   return { ...res.data, status: res.status };
  // } catch (error) {
  //   if (axios.isAxiosError(error) && error.response) {
  //     return { status: error.response.status, error: error.response };
  //   }
  // }
}
