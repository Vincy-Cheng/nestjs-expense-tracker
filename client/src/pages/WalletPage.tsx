import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IWallet } from '../apis/type';
import CustomModal from '../components/Custom/CustomModal';
import CustomTextField from '../components/Custom/CustomTextField';
import CustomSelector from '../components/Custom/CustomSelector';
import { currencyList } from '../utils';
import CustomAlert, { CustomAlertType } from '../components/Custom/CustomAlert';
import { createWallet, deleteWallet, fetchWallets } from '../apis/wallet';
import { AxiosError } from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';

type WalletPageProps = {};

const WalletPage = ({}: WalletPageProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const [newWallet, setNewWallet] = useState<{
    name: string;
    currency: string;
  }>({ name: '', currency: '' });

  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    type: CustomAlertType;
  }>({ message: '', type: 'warning' });

  const { data: wallets } = useQuery<IWallet[]>(['wallets'], fetchWallets);
  // Create wallet mutation
  const createWalletMutation = useMutation<
    IWallet,
    AxiosError<{ error: string; message: string[]; statusCode: number }>,
    Partial<IWallet>
  >(createWallet, {
    onMutate: async (newWallet) => {
      // Optimistically update the cache
      queryClient.setQueryData<IWallet[]>(['wallets'], (oldData) => {
        if (oldData) {
          return [...oldData, newWallet as IWallet];
        }
        return oldData;
      });

      return {
        previousWallets: queryClient.getQueryData<IWallet[]>(['wallets']),
      };
    },
    onError: (error, variables, context) => {
      // Revert the cache to the previous state on error
      const typedContext = context as {
        previousWallets: IWallet[] | undefined;
      };

      if (typedContext.previousWallets) {
        queryClient.setQueryData<IWallet[]>(
          ['wallets'],
          typedContext.previousWallets,
        );
      }
      setErrorMessage({
        type: 'error',
        message:
          error.response?.data.message[0] ?? 'Unexpected error from server',
      });
    },
    onSettled: () => {
      // Refetch the data to ensure it's up to date
      queryClient.invalidateQueries(['wallets']);
    },
    onSuccess(data, variables, context) {
      setErrorMessage({
        type: 'success',
        message: `Wallet is created\nName: ${data.name}\nCurrency:${data.currency}`,
      });
    },
    retry: 3,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const wallet: Partial<IWallet> = {
      ...newWallet,
    };

    try {
      // Fetch the current data from the cache
      const oldData = queryClient.getQueryData<IWallet[]>(['wallets']);

      // Optimistically update the cache
      const optimisticWallet: IWallet = {
        id: Date.now(), // Use a temporary ID
        name: wallet.name ?? newWallet.name,
        currency: wallet.currency ?? newWallet.currency,
      };

      queryClient.setQueryData<IWallet[]>(['wallets'], (prevData) => {
        if (prevData) {
          return [...prevData, optimisticWallet];
        }
        return [optimisticWallet];
      });

      // Call the mutation to create the wallet
      await createWalletMutation.mutateAsync(wallet);

      // The onSuccess callback will automatically update the cache with the actual data
    } catch (error) {
      console.error('Error creating wallet:', error);
      // Handle error here and set appropriate error message if needed
    } finally {
      setNewWallet({ name: '', currency: '' });
    }
  };

  const removeWalletMutation = useMutation(deleteWallet, {
    onError(error, variables, context) {},
    onMutate: async (variables) => {
      queryClient.setQueryData<IWallet[]>(['wallets'], (oldData) => {
        if (oldData) {
          return oldData.filter((prev) => prev.id !== variables);
        }
        return oldData;
      });

      return {
        previousWallets: queryClient.getQueryData<IWallet[]>(['wallets']),
      };
    },
  });

  return (
    <div>
      <div className="bg-amber-200 rounded-md p-2">
        <div className="flex justify-between items-center pb-2">
          <span>List of Wallets</span>
          <div className="hover:bg-amber-50 hover:bg-opacity-50 rounded-full p-1">
            <AiOutlinePlus
              className="cursor-pointer "
              onClick={() => {
                setOpen(true);
                setErrorMessage({ type: 'warning', message: '' });
              }}
            />
          </div>
        </div>
        {wallets && (
          <div className="grid grid-flow-col overflow-x-auto grid-rows-2 py-2 gap-2 w-fit">
            {wallets.map(({ id, name, currency }) => (
              <div
                key={id}
                className="rounded-md bg-amber-100 p-3 relative flex flex-col gap-3 w-[200px]"
              >
                <span className="absolute font-semibold text-amber-500 text-opacity-10 text-5xl sm:text-7xl  right-1 bottom-1">
                  {currency}
                </span>
                <div
                  className="absolute text-zinc-400 right-1 cursor-pointer hover:bg-zinc-200 hover:bg-opacity-50 rounded-full p-1 active:bg-zinc-300 active:bg-opacity-50"
                  onClick={async () => {
                    try {
                      await removeWalletMutation.mutateAsync(id);
                    } catch (error) {}
                  }}
                >
                  <HiOutlineTrash strokeWidth={1} />
                </div>

                <div>{name}</div>
                <div>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: currency,
                  }).format(10)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {open && (
        <CustomModal setOpen={setOpen}>
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="text-2xl">Add New Wallet</div>
              {createWalletMutation.isLoading ? 'Creating...' : 'Create'}
              {errorMessage.message && (
                <CustomAlert
                  type={errorMessage.type}
                  content={errorMessage.message}
                />
              )}

              <CustomTextField
                type={'text'}
                name={'Name'}
                value={newWallet.name}
                callbackAction={(event) => {
                  setNewWallet((prev) => {
                    return {
                      ...prev,
                      name: event.target.value,
                    };
                  });
                }}
              />

              <CustomSelector
                title={'Currency'}
                options={currencyList}
                value={newWallet.currency}
                callbackAction={(option) => {
                  setNewWallet((prev) => {
                    return { ...prev, currency: option };
                  });
                }}
                filter
                placeholder="ISO Code of currency"
              />

              <div className="flex justify-end">
                <button
                  className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default WalletPage;