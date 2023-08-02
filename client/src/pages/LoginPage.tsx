import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { setIsSignedIn } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

type Props = {};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center gap-4 font-Barlow ">
      <div className="w-fit p-3 text-lg flex flex-col gap-2 rounded-lg shadow">
        <div className="flex flex-col gap-2">
          <div>Username: </div>
          <input
            type="text"
            className="border"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div> Password: </div>
          <input
            type="password"
            className="border"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-end">
          <div
            className="bg-info-300 w-fit p-1 rounded-md text-white hover:bg-info-200 cursor-pointer active:bg-info-400 select-none"
            onClick={() => {
              dispatch(setIsSignedIn());
              navigate('/');
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
