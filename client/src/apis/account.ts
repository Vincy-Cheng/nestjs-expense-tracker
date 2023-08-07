import { Axios } from '.';

export async function createAccount() {}

export async function fetchAllAccounts() {
  const url = 'v1/accounts';
  const res = await Axios.get(url);
  return res.data;
}

export async function fetchAccount(id: number) {}

export async function updateAccount() {}

export async function deleteAccount(id: number) {}
