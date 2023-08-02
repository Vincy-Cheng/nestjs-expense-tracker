import React from 'react';
import { useAppDispatch } from '../hooks';
import { logout } from '../store/userSlice';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="">
      Header{' '}
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Header;
