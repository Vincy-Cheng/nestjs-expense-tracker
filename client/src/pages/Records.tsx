import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { fetchWallets } from '../apis/wallet';
import { useAppSelector } from '../hooks';
import { IoSettingsOutline } from 'react-icons/io5';
import { IRecord, IWallet } from '../types';
import { AiOutlinePlus } from 'react-icons/ai';
import RecordModal from '../components/record/RecordModal';
import { DateTime } from 'luxon';

type Props = {};

const Records = (props: Props) => {
  const [open, setOpen] = useState(false);

  const [editRecord, setEditRecord] = useState<IRecord>({
    id: 0,
    price: 0,
    remarks: '',
    date: DateTime.now().toFormat('yyyy-LL-dd'),
  });

  const { data: wallets } = useQuery<IWallet[]>(['wallets'], fetchWallets);

  const { id } = useAppSelector((state) => state.wallet);

  const favWallet = useMemo(() => {
    if (wallets) {
      if (id === 0) {
        return wallets[0];
      } else {
        return wallets[id];
      }
    }
  }, [id, wallets]);

  return (
    <div className="relative h-full">
      {favWallet && (
        <div className="bg-primary-200 p-1 rounded-md flex justify-between">
          <div>
            <div>{favWallet.name}</div>
            <div>Income:</div>
            <div>Expense:</div>
            <div>Balance:</div>
          </div>
          <IoSettingsOutline strokeWidth={1} className="cursor-pointer" />
        </div>
      )}

      <div
        className="absolute bottom-0 right-0 w-fit p-1 text-2xl text-white rounded-full bg-primary-400 hover:bg-primary-300 active:bg-primary-200 cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AiOutlinePlus />
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

export default Records;
