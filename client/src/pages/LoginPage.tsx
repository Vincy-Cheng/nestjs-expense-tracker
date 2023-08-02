import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { logout, setIsSignedIn } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../apis';

type Props = {};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const login = useMutation(signIn, {
    onError(error, variables, context) {
      // An error happened!
      dispatch(logout());
    },
    onSuccess(data, variables, context) {
      console.log(data);
      dispatch(setIsSignedIn());
      navigate('/');
    },
  });

  const handleSignIn = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();

    if (username && password) {
      login.mutateAsync({ username, password });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 font-Barlow ">
      <div className="w-fit p-3 text-lg flex flex-col gap-2 rounded-lg shadow">
        <div className="flex flex-col gap-2">
          <div>Username: </div>
          <input
            value={username}
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
            value={password}
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
            onClick={handleSignIn}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
