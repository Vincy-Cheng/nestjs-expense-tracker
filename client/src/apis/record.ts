import { Axios } from '.';
import { IRecord } from '../types';

export async function createRecord(
  newRecord: Partial<IRecord>,
): Promise<IRecord> {
  const res = await Axios.post('/v1/records', { newRecord });

  return res.data;
}
