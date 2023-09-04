import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { fetchWallets } from '../apis/wallet';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IoSettingsOutline } from 'react-icons/io5';
import { ICategory, IRecord, IWalletRecordWithCategory } from '../types';
import { AiOutlinePlus } from 'react-icons/ai';
import RecordModal from '../components/record/RecordModal';
import { DateTime } from 'luxon';
import IconSelector from '../components/IconSelector';
import clsx from 'clsx';
import * as _ from 'lodash';
import CustomAccordion from '../components/Custom/CustomAccordion';
import CustomModal from '../components/Custom/CustomModal';
import CustomSelector from '../components/Custom/CustomSelector';
import { updateFavWallet } from '../store/walletSlice';

type Props = {};

const Records = (props: Props) => {
  const [open, setOpen] = useState(false);

  const [openSelectWallet, setOpenSelectWallet] = useState(false);

  const [editRecord, setEditRecord] = useState<IRecord>({
    id: 0,
    price: 0,
    remarks: '',
    date: DateTime.now().toISO() ?? DateTime.now().toFormat('yyyy-LL-dd'),
  });

  const [editRecordCategory, setEditRecordCategory] =
    useState<ICategory | null>(null);

  const { data: wallets } = useQuery<IWalletRecordWithCategory[]>(
    ['wallets'],
    fetchWallets,
  );

  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.wallet);

  const { favWallet, income, expense, total, dateRecords } = useMemo(() => {
    let tmpWallet;
    if (wallets) {
      if (id === 0) {
        tmpWallet = wallets[0];
      } else {
        tmpWallet = wallets.find((w) => w.id === id);
      }
    }
    const walletExpense =
      tmpWallet?.records?.reduce((i, w) => {
        if (w.category.type === 'expense') {
          i -= Number(w.price);
        }
        return i;
      }, 0) ?? 0;
    const walletIncome =
      tmpWallet?.records?.reduce((i, w) => {
        if (w.category.type === 'income') {
          i += Number(w.price);
        }
        return i;
      }, 0) ?? 0;

    const groupedDates = _.groupBy(tmpWallet?.records, 'date');

    const dateRecords = _.sortBy(Object.keys(groupedDates)).map((date) => ({
      date,
      records: groupedDates[date],
    }));

    return {
      favWallet: tmpWallet,
      income: walletIncome,
      expense: walletExpense,
      total: walletExpense + walletIncome,
      dateRecords,
    };
  }, [id, wallets]);

  return (
    <div className="relative h-full">
      {favWallet ? (
        <div className="bg-primary-500 p-2 rounded-md text-white relative">
          <div className="relative">
            <div>{favWallet.name}</div>
            <div className="flex items-center justify-between">
              <p>Income:</p> <p>{income.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Expense:</p> <p>{expense.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Balance:</p> <p>{total.toFixed(2)}</p>
            </div>
            <div className="absolute text-primary-100 text-opacity-25 text-6xl top-0 right-0">
              {favWallet.currency}
            </div>
          </div>
          <div
            className="absolute top-1 right-1 rounded-full p-1 hover:bg-primary-300 active:bg-primary-100 h-fit"
            onClick={() => {
              // Update the fav wallet
              // update the dispatch -> local storage
              setOpenSelectWallet(true);
            }}
          >
            <IoSettingsOutline strokeWidth={1} className="cursor-pointer" />
          </div>
        </div>
      ) : (
        <div>Please create a wallet first to create records.</div>
      )}

      <div
        className="absolute bottom-0 right-0 w-fit p-1 text-2xl text-white rounded-full bg-primary-400 hover:bg-primary-300 active:bg-primary-200 cursor-pointer"
        onClick={() => {
          setEditRecord({
            id: 0,
            price: 0,
            remarks: '',
            date:
              DateTime.now().toISO() ?? DateTime.now().toFormat('yyyy-LL-dd'),
          });
          setOpen(true);
        }}
      >
        <AiOutlinePlus />
      </div>
      {Object.keys(dateRecords).length > 0 ? (
        <div className="bg-primary-300 rounded-md p-2 mt-1">
          {dateRecords.map(({ date, records }, index) => (
            <div key={index} className="py-1">
              <CustomAccordion
                header={
                  <div className="flex justify-between items-center">
                    <div>{date}</div>
                    <div>
                      ${' '}
                      {records
                        .reduce((acc, cur) => {
                          const price =
                            cur.category.type === 'expense'
                              ? -Number(cur.price)
                              : Number(cur.price);
                          return acc + price;
                        }, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                }
                customClass="bg-primary-100"
                triggerUpdate={favWallet}
                hideArrow
              >
                <div className="space-y-1">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className={clsx(
                        'flex items-center justify-between p-1 bg-white rounded-md cursor-pointer hover:bg-primary-50',
                        record.category.type === 'expense'
                          ? 'text-rose-400'
                          : 'text-info-400',
                      )}
                      onClick={() => {
                        setEditRecord(record);
                        setEditRecordCategory(record.category);
                        setOpen(true);
                      }}
                    >
                      <div className={clsx('flex items-center gap-2')}>
                        <div
                          className={clsx(
                            'p-1 rounded-full text-white bg-amber-400',
                          )}
                        >
                          <IconSelector name={record.category.icon} />
                        </div>

                        <span>{record.category.name}</span>
                        <span>{record.remarks}</span>
                      </div>

                      <span>
                        {record.category.type === 'expense' && '-'}${' '}
                        {record.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CustomAccordion>
            </div>
          ))}
        </div>
      ) : (
        <div>No records</div>
      )}

      {open && (
        <RecordModal
          wallet={favWallet}
          setOpen={setOpen}
          editRecord={editRecord}
          setEditRecord={setEditRecord}
          recordCategory={editRecordCategory ?? undefined}
        />
      )}

      {openSelectWallet && (
        <CustomModal setOpen={setOpenSelectWallet}>
          <div>
            <p className="text-2xl">Select your wallet</p>

            <div className="py-2">
              <p className="font-semibold">Current wallet:</p>

              <div>Name: {favWallet?.name}</div>
              <div>Currency: {favWallet?.currency}</div>
            </div>
            <div>
              <CustomSelector
                title={'Wallet List'}
                options={wallets?.map((w) => w.name) ?? []}
                value={favWallet?.name}
                callbackAction={(value) => {
                  const newFavWallet = wallets?.find((w) => w.name === value);
                  console.log(value);
                  if (newFavWallet) {
                    console.log(newFavWallet);
                    dispatch(updateFavWallet(newFavWallet.id));
                  }
                }}
              />
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Records;
