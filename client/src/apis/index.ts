import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginResponse, User } from './type';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function signIn(user: User): Promise<LoginResponse | undefined> {
  try {
    const res: AxiosResponse<LoginResponse> = await Axios.post(
      '/v1/auth/login',
      {
        username: user.username,
        password: user.password,
      },
    );

    return { ...res.data, status: res.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { status: error.response.status, error: error.response };
    }
  }
}
