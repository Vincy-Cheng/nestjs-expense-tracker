import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createWallet, fetchAllWallets } from '../apis/wallet';
import { Wallet } from '../apis/type';
import { AxiosError } from 'axios';
import { Plus } from 'tabler-icons-react';
import CustomModal from '../components/Custom/CustomModal';
import CustomTextField from '../components/Custom/CustomTextField';
import CustomSelector from '../components/Custom/CustomSelector';
import { currencyList } from '../utils';
import CustomAlert, { CustomAlertType } from '../components/Custom/CustomAlert';

type WalletPageProps = {};

const WalletPage = ({}: WalletPageProps) => {
  const queryClient = new QueryClient();
  const [open, setOpen] = useState(false);

  const [newWallet, setNewWallet] = useState<{
    name: string;
    currency: string;
  }>({ name: '', currency: '' });

  const [errorMessage, setErrorMessage] = useState<{
    message: string;
    type: CustomAlertType;
  }>({ message: '', type: 'warning' });

  const {
    data: wallets,
    isError,
    isLoading,
    error,
  } = useQuery<Wallet[], AxiosError>(
    ['wallets'],
    async () => {
      return await fetchAllWallets();
    },
    {},
  );

  const create = useMutation({
    mutationFn: createWallet,
    onSuccess: (data, variables, context) => {
      if (data && data?.status < 400) {
        queryClient.setQueryData(['wallets', data.id], data);
        queryClient.invalidateQueries(['wallets'], { exact: true });
        setErrorMessage({ type: 'success', message: 'Wallets is created' });
      } else {
        setErrorMessage({
          type: 'error',
          message: data?.error?.data.message ?? '',
        });
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newWallet.name && newWallet.currency) {
      await create.mutateAsync({ ...newWallet });
    }
  };

  return (
    <div>
      <div className="bg-amber-200 rounded-md p-2">
        <div className="flex justify-between items-center pb-2">
          <span>List of Wallets</span>
          <Plus
            className="cursor-pointer hover:bg-amber-50 rounded-full "
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        {wallets && (
          <div className="grid grid-cols-3 gap-2">
            {wallets.map(({ id, name, currency }) => (
              <div key={id} className="rounded-md bg-amber-100 p-1 relative">
                <span className="absolute font-semibold text-amber-500 text-opacity-40 text-3xl right-0 bottom-0">
                  {currency}
                </span>
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
