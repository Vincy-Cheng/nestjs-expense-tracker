import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IWallet } from '../apis/type';
import { fetchWallets } from '../apis/wallet';
import { useAppSelector } from '../hooks';
import { Settings } from 'tabler-icons-react';

type Props = {};

const Records = (props: Props) => {
  const queryClient = useQueryClient();

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
  }, [wallets]);

  return (
    <div>
      {favWallet && (
        <div className="bg-primary-200 p-1 rounded-md flex justify-between">
          <div>
            <div>{favWallet.name}</div>
            <div>Income:</div>
            <div>Expense:</div>
            <div>Balance:</div>
          </div>
          <Settings strokeWidth={1}></Settings>
        </div>
      )}

      <div>Records</div>
    </div>
  );
};

export default Records;
