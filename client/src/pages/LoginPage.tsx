import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { setIsSignedIn } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../apis';
import CustomAlert from '../components/CustomAlert';
import { Eye } from 'tabler-icons-react';

type Props = {};

const LoginPage = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const login = useMutation(signIn, {
    onError(error, variables, context) {
      console.log(error);
    },
    onSuccess(data, variables, context) {
      if (data && data?.status < 400 && data.user) {
        dispatch(
          setIsSignedIn({
            access_token: data.access_token,
            user: data.user,
          }),
        );
        setError('');
        navigate('/');
      } else {
        // Handle error
        console.log(data?.error);
        setError(data?.error?.data.message ?? '');
      }
    },
    retry: 3,
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
    <div className="flex flex-col items-center gap-4 font-Barlow">
      <div className="min-w-[50%] py-3 px-5 text-lg flex flex-col gap-2 rounded-lg shadow">
        {error && <CustomAlert type={'error'} content={error} />}

        <div className="flex flex-col gap-2">
          <div>Username: </div>
          <input
            value={username}
            type="text"
            className="outline-none border border-info-600 rounded-md  bg-transparent px-2"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div> Password: </div>
          <div className=" border border-info-600 rounded-md flex justify-between items-center px-2">
            <input
              value={password}
              type={showPassword ? 'text' : 'password'}
              className="outline-none bg-transparent flex-1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Eye
              strokeWidth={1}
              className="text-info-500 cursor-pointer hover:text-info-800 active:text-info-600"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            />
          </div>
        </div>
        <div>
          <div
            className="cursor-pointer text-xs hover:text-info-600"
            onClick={() => {
              navigate('/register');
            }}
          >
            You don't have an account? Click Me to register
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
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
