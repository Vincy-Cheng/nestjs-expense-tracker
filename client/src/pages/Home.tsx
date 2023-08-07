import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Account, User } from '../apis/type';
import { fetchAllAccounts } from '../apis/account';
import { Axios } from '../apis';
import { AxiosError } from 'axios';
import { Plus } from 'tabler-icons-react';

type Props = {};

const Home = (props: Props) => {
  const { data, isError, isLoading, error } = useQuery(
    ['accounts'],
    async () => {
      return await fetchAllAccounts();
    },
    {},
  );

  return (
    <div className="select-none">
      <div>Quick Access</div>
      <div className="flex gap-4 flex-wrap">
        <div className="bg-info-300 rounded-lg p-1 w-[300px] h-fit">
          <div className="flex justify-between">
            <p>Latest Record</p>
            <Plus className="cursor-pointer hover:bg-info-200 rounded-full active:bg-info-100" />
          </div>
          <div>
            <p>d</p>
            <p>d</p>
            <p>d</p>
            <p>d</p>
            <p>d</p>
            <p>d</p>
          </div>
        </div>
        <div className="bg-primary-300 rounded-lg p-1 w-[300px] h-fit">
          Trend
        </div>
      </div>
    </div>
  );
};

export default Home;
