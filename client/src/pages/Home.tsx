import { AiOutlinePlus } from 'react-icons/ai';
import RecordModal from '../components/record/RecordModal';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useRecord } from '../provider/RecordDataProvider';
import { IRecord, IRecordWithCategory } from '../types';
import { useQuery } from '@tanstack/react-query';
import { fetchRecords } from '../apis/record';
import IconSelector from '../components/IconSelector';
import clsx from 'clsx';

type Props = {};

const Home = (props: Props) => {
  const [open, setOpen] = useState(false);

  const [editRecord, setEditRecord] = useState<IRecord>({
    id: 0,
    price: 0,
    remarks: '',
    date: DateTime.now().toISO() ?? DateTime.now().toFormat('yyyy-LL-dd'),
  });

  const { favWallet } = useRecord();

  const { data: records } = useQuery<IRecordWithCategory[]>(
    ['records', favWallet.id],
    () => fetchRecords(favWallet.id),
  );

  return (
    <div className="select-none">
      <div>Quick Access</div>
      <div className="flex gap-4 flex-wrap">
        <div className="bg-info-300 rounded-lg p-1 w-[300px] h-fit">
          <div className="flex justify-between items-center">
            <p>Latest Record</p>
            <div
              className="cursor-pointer hover:bg-info-200 rounded-full active:bg-info-100 p-1"
              onClick={() => {
                setOpen(true);
              }}
            >
              <AiOutlinePlus className="" />
            </div>
          </div>
          <div className="space-y-1">
            {/* Latest Records */}
            {records?.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-md bg-primary-100 p-1"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      'text-white rounded-full p-1',
                      record.category.type === 'expense'
                        ? 'bg-rose-300'
                        : 'bg-info-300',
                    )}
                  >
                    <IconSelector name={record.category.icon} />
                  </div>
                  {record.category.name}
                </div>
                {favWallet.currency} {record.price}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary-300 rounded-lg p-1 w-[300px] h-fit">
          Trend
        </div>
      </div>

      {open && (
        <RecordModal
          wallet={favWallet}
          setOpen={setOpen}
          editRecord={editRecord}
          setEditRecord={setEditRecord}
        />
      )}
    </div>
  );
};

export default Home;
