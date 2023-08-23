import { Axios } from '.';
import { ICreateRecord, IRecord } from '../types';

export async function createRecord(newRecord: ICreateRecord): Promise<IRecord> {
  const res = await Axios.post('v1/records', {
    price: newRecord.price,
    remarks: newRecord.remarks,
    date: newRecord.date,
    wallet: newRecord.wallet,
    category: newRecord.category,
  });

  return res.data;
}
