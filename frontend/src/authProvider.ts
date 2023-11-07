import { AuthBindings } from '@refinedev/core';
import jwt_decode from 'jwt-decode';
import { Axios, signIn } from './apis';
import { IUser } from './types';
import { AxiosError } from 'axios';

export const ACCESS_TOKEN = 'access_token';

export const authProvider: AuthBindings = {
  login: async (user: IUser) => {
    if (user) {
      const { access_token } = await signIn(user);
      sessionStorage.setItem(ACCESS_TOKEN, access_token);

      Axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: 'Invalid username or password',
      },
    };
  },
  logout: async () => {
    delete Axios.defaults.headers.common['Authorization'];
    sessionStorage.removeItem(ACCESS_TOKEN);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN);

    if (accessToken) {
      try {
        const decoded = jwt_decode(accessToken);
        if (decoded) {
          Axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          return {
            authenticated: true,
          };
        }
      } catch (error) {
        return {
          authenticated: false,
          redirectTo: '/login',
        };
      }
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      try {
        const decoded = jwt_decode<{
          username: string;
          sub: number;
          iat: number;
          exp: number;
        }>(accessToken);
        if (decoded) {
          return {
            ...decoded,
          };
        }
      } catch (error) {
        return null;
      }
    }
    return null;
  },
  onError: async (error: AxiosError) => {
    return { error, logout: true };
  },
};
