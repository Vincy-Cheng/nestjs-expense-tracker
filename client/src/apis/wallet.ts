import axios, { AxiosResponse } from 'axios';
import { Axios } from '.';

export async function createWallet(newWallet: {
  name: string;
  currency: string;
}) {
  try {
    const url = 'v1/wallets';
    const res: AxiosResponse = await Axios.post(url, {
      ...newWallet,
    });

    return { ...res.data, status: res.status };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { status: error.response.status, error: error.response };
    }
  }
}

export async function fetchAllWallets() {
  const url = 'v1/wallets';
  const res = await Axios.get(url);
  return res.data;
}

export async function fetchWallet(id: number) {}

export async function updateWallet() {}

export async function deleteWallet(id: number) {}
