import { Axios } from '.';
import { IWallet } from './type';

export const fetchWallets = async (): Promise<IWallet[]> => {
  const response = await Axios.get('/v1/wallets');
  return response.data;
};

// Create wallet mutation
export const createWallet = async (
  newWallet: Partial<IWallet>,
): Promise<IWallet> => {
  const response = await Axios.post('/v1/wallets', newWallet);
  return response.data;
};

export async function fetchWallet(id: number) {}

export async function updateWallet() {}

export async function deleteWallet(id: number) {
  const url = `v1/wallets/${id}`;

  const response = await Axios.delete(url);

  return response.data;
}
