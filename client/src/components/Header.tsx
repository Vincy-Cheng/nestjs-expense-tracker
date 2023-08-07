import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Expense Tracker
      </button>

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        {isSignedIn ? (
          <>Logout</>
        ) : (
          <div
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </div>
        )}
      </button>
    </div>
  );
};

export default Header;
