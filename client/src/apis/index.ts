import axios from 'axios';
import { NewUser } from '../pages/RegisterPage';
import { IUser, IUserInfo, LoginResponse } from '../types';

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
}

export async function profile(id: number): Promise<IUserInfo> {
  const res = await Axios.get(`/v1/users/${id}`);

  return res.data;
}

export async function updateCategoryOrder(order: {
  id: number;
  categoryOrder: number[];
}): Promise<IUserInfo> {
  const res = await Axios.patch(`/v1/users/${order.id}/category-order`, {
    id: order.id,
    categoryOrder: order.categoryOrder,
  });

  return res.data;
}
