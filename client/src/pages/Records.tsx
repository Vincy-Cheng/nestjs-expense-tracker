import { useQuery } from '@tanstack/react-query';
import { SetStateAction, useMemo, useState } from 'react';
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
        return wallets.find((w) => w.id === id);
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
        <div className="bg-primary-500 p-2 rounded-md text-white relative">
          <div>
            <div>{favWallet.name}</div>
            <div className="flex items-center justify-between">
              <p>Income:</p> <p>{income}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Expense:</p> <p>{expense}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Balance:</p> <p>{total}</p>
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
      )}

      <div
        className="absolute bottom-0 right-0 w-fit p-1 text-2xl text-white rounded-full bg-primary-400 hover:bg-primary-300 active:bg-primary-200 cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AiOutlinePlus />
      </div>

      <div className="bg-primary-300 rounded-md p-2 mt-1">
        {Object.entries(dateRecords)
          .reverse()
          .map((date, index) => (
            <div key={index} className="py-1">
              <CustomAccordion
                header={
                  <div className="flex justify-between items-center">
                    <div>{date[0]}</div>
                    <div>
                      ${' '}
                      {date[1].reduce((acc, cur) => {
                        const price =
                          cur.category.type === 'expense'
                            ? -cur.price
                            : cur.price;
                        return acc + price;
                      }, 0)}
                    </div>
                  </div>
                }
                customClass="bg-primary-100"
                triggerUpdate={favWallet}
                hideArrow
              >
                <div className="space-y-1">
                  {date[1].map((record) => (
                    <div
                      key={record.id}
                      className={clsx(
                        'flex items-center justify-between p-1 bg-primary-50 rounded-md',
                        record.category.type === 'expense'
                          ? 'text-rose-400'
                          : 'text-info-400',
                      )}
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

      {open && (
        <RecordModal
          wallet={favWallet}
          setOpen={setOpen}
          editRecord={editRecord}
          setEditRecord={setEditRecord}
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
