import axios, { AxiosResponse } from 'axios';
import { AccessToken, User } from './type';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export async function signIn(user: User): Promise<AccessToken | undefined> {
  try {
    const res: AxiosResponse<AccessToken> = await Axios.post('/v1/auth/login', {
      ...user,
    });

    return res?.data;
  } catch (error) {
    console.log(error);
  }
}
