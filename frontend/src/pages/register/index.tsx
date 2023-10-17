import { AuthPage } from '@refinedev/core';
import { IUser, IUserInfo } from '../../types';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { register } from '../../apis';
import CustomTextField from '../../components/custom/CustomText';
import { toast } from 'react-toastify';
export interface NewUser extends IUser {
  email: string;
  confirmPassword: string;
}

export const Register = () => {
  const [userInfo, setUserInfo] = useState<NewUser>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const createUser = useMutation<
    IUserInfo,
    AxiosError<{ error: string; message: string; statusCode: number }>,
    NewUser
  >(register, {
    onError(error, variables, context) {
      toast(error.message, { type: 'error' });
    },
    onSuccess(data, variables, context) {},
    onSettled(data, error, variables, context) {
      setUserInfo({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
      });
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
      toast('Please fill up all the blanks', { type: 'error' });
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      toast('Passwords do not match!', { type: 'error' });
    }

    if (isValidEmail(userInfo.email)) {
      try {
        await createUser.mutateAsync(userInfo);
      } catch (error) {}
    } else {
      toast('Invalid email', { type: 'error' });
    }
  };

  return (
    <AuthPage
      type="register"
      renderContent={(content) => (
        <div className="flex flex-col items-center gap-4 font-Barlow">
          <form
            className="w-1/2 py-3 px-5 text-lg flex flex-col gap-2 rounded-lg shadow dark:shadow-zinc-700"
            onSubmit={handleRegister}
          >
            <CustomTextField
              type="text"
              name="Username"
              value={userInfo.username}
              callbackAction={(event) => {
                setUserInfo((prev) => {
                  return { ...prev, username: event.target.value };
                });
              }}
            />
            <CustomTextField
              type="email"
              name="Email"
              value={userInfo.email}
              callbackAction={(event) => {
                setUserInfo((prev) => {
                  return { ...prev, email: event.target.value };
                });
              }}
            />

            <CustomTextField
              type="password"
              name="Password"
              value={userInfo.password}
              callbackAction={(event) => {
                setUserInfo((prev) => {
                  return { ...prev, password: event.target.value };
                });
              }}
              visibleControl
              visible={showPassword}
              setVisibleControl={setShowPassword}
            />

            <CustomTextField
              type="password"
              name="Confirm Password"
              value={userInfo.confirmPassword}
              callbackAction={(event) => {
                setUserInfo((prev) => {
                  return { ...prev, confirmPassword: event.target.value };
                });
              }}
              visibleControl
              visible={showConfirmPassword}
              setVisibleControl={setConfirmShowPassword}
            />
            <div className="flex justify-end">
              <button className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    />
  );
};
