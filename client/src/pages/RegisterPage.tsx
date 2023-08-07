import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import CustomAlert, { CustomAlertType } from '../components/CustomAlert';
import { User } from '../apis/type';
import { Eye } from 'tabler-icons-react';
import { useMutation } from '@tanstack/react-query';
import { register } from '../apis';

type Props = {};

export interface NewUser extends User {
  email: string;
  confirmPassword: string;
}

const RegisterPage = (props: Props) => {
  const [userInfo, setUserInfo] = useState<NewUser>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [error, setError] = useState<{
    message: string;
    type: CustomAlertType;
  }>({ message: '', type: 'warning' });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const createUser = useMutation(register, {
    onError(error, variables, context) {
      console.log(error);
    },
    onSuccess(data, variables, context) {
      if (data && data?.status < 400 && data.user) {
        setError({ type: 'success', message: 'User is created' });
      } else {
        // Handle error
        setError({ type: 'error', message: data?.error?.data.message ?? '' });
      }
    },
    retry: 3,
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !userInfo.username ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.confirmPassword
    ) {
      return setError({
        message: 'Please fill up all the blanks',
        type: 'error',
      });
    }

    if (isValidEmail(userInfo.email)) {
      await createUser.mutateAsync(userInfo);
    } else {
      setError({ message: 'Invalid email', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 font-Barlow">
      <form
        className="w-1/2 py-3 px-5 text-lg flex flex-col gap-2 rounded-lg shadow"
        onSubmit={handleRegister}
      >
        {error.message && (
          <CustomAlert type={error.type} content={error.message} />
        )}

        <div className="flex flex-col gap-2">
          <div>Username: </div>
          <input
            value={userInfo.username}
            type="text"
            className="outline-none border border-info-600 rounded-md  bg-transparent px-2"
            onChange={(e) => {
              setUserInfo((prev) => {
                return { ...prev, username: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Email: </div>
          <input
            value={userInfo.email}
            type="email"
            className="outline-none border border-info-600 rounded-md  bg-transparent px-2"
            onChange={(e) => {
              setUserInfo((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div> Password: </div>
          <div className=" border border-info-600 rounded-md flex justify-between items-center px-2">
            <input
              value={userInfo.password}
              type={showPassword ? 'text' : 'password'}
              className="outline-none bg-transparent flex-1"
              onChange={(e) => {
                setUserInfo((prev) => {
                  return { ...prev, password: e.target.value };
                });
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
        <div className="flex flex-col gap-2">
          <div>Confirm Password: </div>
          <div className=" border border-info-600 rounded-md flex justify-between items-center px-2">
            <input
              value={userInfo.confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              className="outline-none bg-transparent flex-1"
              onChange={(e) => {
                setUserInfo((prev) => {
                  return { ...prev, confirmPasssword: e.target.value };
                });
              }}
            />
            <Eye
              strokeWidth={1}
              className="text-info-500 cursor-pointer hover:text-info-800 active:text-info-600"
              onClick={() => {
                setConfirmShowPassword((prev) => !prev);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
