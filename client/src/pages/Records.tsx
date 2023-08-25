import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { fetchWallets } from '../apis/wallet';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IoSettingsOutline } from 'react-icons/io5';
import { IRecord, IWalletRecordWithCategory } from '../types';
import { AiOutlinePlus } from 'react-icons/ai';
import RecordModal from '../components/record/RecordModal';
import { DateTime } from 'luxon';
import IconSelector from '../components/IconSelector';
import clsx from 'clsx';
import * as _ from 'lodash';
import CustomAccordion from '../components/Custom/CustomAccordion';

type Props = {};

const Records = (props: Props) => {
  const [open, setOpen] = useState(false);

  const [editRecord, setEditRecord] = useState<IRecord>({
    id: 0,
    price: 0,
    remarks: '',
    date: DateTime.now().toISO() ?? DateTime.now().toFormat('yyyy-LL-dd'),
  });

  const { data: wallets } = useQuery<IWalletRecordWithCategory[]>(
    ['wallets'],
    fetchWallets,
  );

  const dispatch = useAppDispatch();

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

  const { income, expense, total, dateRecords } = useMemo(() => {
    const walletExpense =
      favWallet?.records?.reduce((i, w) => {
        if (w.category.type === 'expense') {
          i -= w.price;
        }
        return i;
      }, 0) ?? 0;
    const walletIncome =
      favWallet?.records?.reduce((i, w) => {
        if (w.category.type === 'income') {
          i += w.price;
        }
        return i;
      }, 0) ?? 0;

    const dateRecords = _.groupBy(favWallet?.records, 'date');

    return {
      income: walletIncome,
      expense: walletExpense,
      total: walletExpense + walletIncome,
      dateRecords,
    };
  }, [favWallet]);

  return (
    <div className="relative h-full">
      {favWallet && (
        <div className="bg-primary-200 p-1 rounded-md flex justify-between">
          <div>
            <div>{favWallet.name}</div>
            <div>Income: {income}</div>
            <div>Expense: {expense}</div>
            <div>Balance: {total}</div>
          </div>
          <div
            className="rounded-full p-1 hover:bg-primary-300 active:bg-primary-100"
            onClick={() => {
              // Update the fav wallet
              // update the dispatch -> local storage
            }}
          >
            <IoSettingsOutline strokeWidth={1} className="cursor-pointer" />
          </div>
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

      <div className="bg-primary-100 rounded-md p-2 mt-1">
        {Object.entries(dateRecords).map((date, index) => (
          <CustomAccordion header={date[0]}>
            <div>
              {date[1].map((record) => (
                <div key={record.id}>
                  <div
                    className={clsx(
                      'flex items-center gap-2',
                      record.category.type === 'expense'
                        ? 'text-rose-400'
                        : 'text-info-400',
                    )}
                  >
                    <IconSelector name={record.category.icon} />
                    <span>{record.category.name}</span>
                    <span>{record.remarks}</span>
                  </div>

                  <span>{record.price}</span>
                </div>
              ))}
            </div>
          </CustomAccordion>
          // <div key={`date-record-${date[0]}`}>
          //   <span>{date[0]}</span>
          //   <div>
          //     {date[1].map((record) => (
          //       <div key={record.id}>
          //         <div
          //           className={clsx(
          //             'flex items-center gap-2',
          //             record.category.type === 'expense'
          //               ? 'text-rose-400'
          //               : 'text-info-400',
          //           )}
          //         >
          //           <IconSelector name={record.category.icon} />
          //           <span>{record.category.name}</span>
          //           <span>{record.remarks}</span>
          //         </div>

          //         <span>{record.price}</span>
          //       </div>
          //     ))}
          //   </div>
          // </div>
        ))}
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
