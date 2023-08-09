import axios, { AxiosResponse } from 'axios';
import { LoginResponse, RegisterResponse, User } from './type';
import { NewUser } from '../pages/RegisterPage';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function signIn(user: User): Promise<LoginResponse> {
  // try {
  //   const res: AxiosResponse<LoginResponse> = await Axios.post(
  //     '/v1/auth/login',
  //     {
  //       ...user,
  //     },
  //   );

  //   return { ...res.data, status: res.status };
  // } catch (error) {
  //   if (axios.isAxiosError(error) && error.response) {
  //     return { status: error.response.status, error: error.response };
  //   }
  // }
  const res = await Axios.post('/v1/auth/login', {
    ...user,
  });

  return res.data;
}

export async function register(
  newUser: NewUser,
): Promise<RegisterResponse | undefined> {
  try {
    const res: AxiosResponse<RegisterResponse> = await Axios.post('/v1/users', {
      ...newUser,
    });

    return { ...res.data, status: res.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { status: error.response.status, error: error.response };
    }
  }
}
