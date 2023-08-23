import { Axios } from '.';
import { ICreateRecord, IRecord } from '../types';

export async function createRecord(newRecord: ICreateRecord): Promise<IRecord> {
  const res = await Axios.post('/v1/records', { newRecord });

  return res.data;
}
