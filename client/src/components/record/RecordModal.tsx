import React, { useEffect, useState } from 'react';
import CustomModal from '../Custom/CustomModal';
import {
  ICategory,
  ICreateRecord,
  IRecord,
  IUserInfo,
  IWallet,
  IWalletRecordWithCategory,
} from '../../types';
import Calculator from '../calculator/Calculator';
import { evaluate } from 'mathjs';
import CustomTextField from '../Custom/CustomTextField';
import { createRecord } from '../../apis/record';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { fetchCategories } from '../../apis/category';
import jwt_decode from 'jwt-decode';
import { profile } from '../../apis';
import { useAppSelector } from '../../hooks';
import { ECategoryType } from '../../common/category-type';
import clsx from 'clsx';
import CategorySelector from './CategorySelector';
import IconSelector from '../IconSelector';

type RecordModalProps = {
  wallet: IWallet | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editRecord: IRecord;
  setEditRecord: React.Dispatch<React.SetStateAction<IRecord>>;
};

const RecordModal = ({
  wallet,
  setOpen,
  editRecord,
  setEditRecord,
}: RecordModalProps) => {
  const [value, setValue] = useState<string>('');

  const [sortedCategories, setSortedCategories] = useState<ICategory[]>([]);

  const [categoryType, setCategoryType] = useState<ECategoryType>(
    ECategoryType.EXPENSE,
  );

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const { access_token } = useAppSelector((state) => state.user);

  const queryClient = useQueryClient();

  const decoded = jwt_decode<{
    username: string;
    sub: number;
    iat: number;
    exp: number;
  }>(access_token ?? sessionStorage.getItem('access_token') ?? '');

  const { data: categories } = useQuery<ICategory[]>(
    ['categories'],
    fetchCategories,
  );

  const { data: user } = useQuery<IUserInfo>(['user', decoded.sub], () =>
    profile(decoded.sub),
  );

  const updateCalc = (key: string) => {
    if (key === '=') {
      return setValue((prev) => {
        try {
          return evaluate(prev).toString();
        } catch (error) {
          return prev;
        }
      });
    }
    if (key === 'AC') {
      return setValue('');
    }

    if (key === 'DE') {
      try {
        return setValue((prev) => prev.slice(0, -1));
      } catch (error) {
        return setValue('Error');
      }
    }

    setValue((prev) => prev.concat(key));
  };

  // Create record mutation
  const createRecordMutation = useMutation<
    IRecord,
    AxiosError<{ error: string; message: string; statusCode: number }>,
    ICreateRecord
  >(createRecord, {
    onMutate: async ({ id, price, remarks, date }) => {
      // Optimistically update the cache

      queryClient.setQueryData<IWalletRecordWithCategory[]>(
        ['wallets'],
        (oldData) => {
          if (oldData) {
            const walletIndex = oldData.findIndex(
              (old) => old.id === wallet?.id,
            );

            if (walletIndex && selectedCategory) {
              const record = {
                id,
                price,
                remarks,
                date,
                category: selectedCategory,
              };
              oldData[walletIndex].records.push(record);
            }
          }

          return oldData;
        },
      );

      return {
        previousWallets: queryClient.getQueryData<IWalletRecordWithCategory[]>([
          'wallets',
        ]),
      };
    },
    onError: (error, variables, context) => {
      // Revert the cache to the previous state on error
      const typedContext = context as {
        previousWallets: IWalletRecordWithCategory[] | undefined;
      };

      if (typedContext.previousWallets) {
        queryClient.setQueryData<IWalletRecordWithCategory[]>(
          ['wallets'],
          typedContext.previousWallets,
        );
      }
      toast(error.response?.data.message, { type: 'error' });
    },
    onSettled: () => {
      // Refetch the data to ensure it's up to date
      queryClient.invalidateQueries(['wallets']);
    },
    onSuccess(data, variables, context) {
      toast(`Record is added`, { type: 'success' });
    },
    retry: 3,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!editRecord.price) {
        return toast('Please input the expense/income', { type: 'warning' });
      }

      if (!wallet) {
        return toast('There is no wallet is selected', { type: 'warning' });
      }

      if (!selectedCategory) {
        return toast('Please select the category', { type: 'warning' });
      }

      await createRecordMutation.mutateAsync({
        ...editRecord,
        wallet: wallet,
        category: selectedCategory,
      });
    } catch (error) {}
  };

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      const reg = /\d|\/|\*|-|\+|\./g;

      if (event.key === 'Backspace') {
        return updateCalc('DE');
      }

      if (event.key === 'Enter') {
        return updateCalc('=');
      }

      if (reg.test(event.key)) {
        return updateCalc(event.key);
      }
    };

    window.addEventListener('keydown', keyListener);
    if (!isNaN(Number(value))) {
      setEditRecord((prev) => {
        return { ...prev, price: Number(value) };
      });
    }

    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  }, [value]);

  useEffect(() => {
    if (categories && user) {
      setSortedCategories((prev) => {
        let sorted: ICategory[] = [];
        user.categoryOrder.forEach((id) => {
          const n = categories.filter((category) => category.id === Number(id));

          if (n.length > 0) {
            sorted.push(...n);
          }
        });

        return sorted;
      });
    }
  }, [categories, user]);

  return (
    <CustomModal setOpen={setOpen} size="Medium">
      <form className="w-full" onSubmit={handleSubmit}>
        <p className="text-2xl pb-2">
          New {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}
        </p>
        <CategorySelector
          categoryType={categoryType}
          toggle={(type) => {
            setCategoryType(type);
          }}
        />
        {/* Category */}
        <div
          className={clsx(
            'rounded-md my-2 w-full overflow-auto',
            categoryType === ECategoryType.EXPENSE
              ? 'bg-rose-50'
              : 'bg-info-50',
          )}
        >
          <div
            className={clsx(
              'grid grid-flow-col overflow-x-auto grid-rows-3 w-fit gap-2 p-1',
            )}
          >
            {sortedCategories
              .filter((sorted) => sorted.type === categoryType)
              .map((category) => (
                <div
                  className={clsx(
                    'rounded-md p-1 shadow cursor-pointer flex gap-2 items-center',
                    {
                      'bg-rose-400 text-rose-50 shadow-rose-300 hover:bg-rose-300 active:bg-rose-400':
                        categoryType === ECategoryType.EXPENSE &&
                        selectedCategory?.id === category.id,
                    },

                    {
                      'bg-rose-100 text-rose-400 shadow-rose-300 hover:bg-rose-200 active:bg-rose-100':
                        categoryType === ECategoryType.EXPENSE &&
                        selectedCategory?.id !== category.id,
                    },

                    {
                      'bg-info-400 text-info-50 shadow-info-300 hover:bg-info-300 active:bg-info-100':
                        categoryType === ECategoryType.INCOME &&
                        selectedCategory?.id === category.id,
                    },
                    {
                      'bg-info-100 text-info-400 shadow-info-300 hover:bg-info-200 active:bg-info-100':
                        categoryType === ECategoryType.INCOME &&
                        selectedCategory?.id !== category.id,
                    },
                  )}
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                >
                  <IconSelector name={category.icon} />
                  <span>{category.name}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="relative bg-info-100 text-lg rounded-md p-1 text-right truncate overflow-auto mb-2">
          <span className="absolute left-1 text-info-600 opacity-30 font-semibold">
            {wallet && wallet.currency}
          </span>
          <span>{value.length > 0 ? value : 0}</span>
        </div>

        <div className="bg-zinc-50 rounded-md p-2">
          {/* Calculator */}
          <Calculator
            callback={(key) => {
              updateCalc(key);
            }}
          />
        </div>
        <div className="py-2">
          <CustomTextField
            type={'text'}
            name="Remarks"
            value={editRecord.remarks}
            callbackAction={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditRecord((prev) => {
                return {
                  ...prev,
                  remarks: event.target.value,
                };
              });
            }}
          />
        </div>
        {/* Submit button and choose continue or close */}
        <div className="flex justify-end py-2">
          <button
            className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
            type="submit"
          >
            {editRecord.id === 0 ? 'Create' : 'Update'}
          </button>
        </div>
      </form>
    </CustomModal>
  );
};

export default RecordModal;
