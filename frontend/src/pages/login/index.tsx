import { AuthPage, useLogin, useNavigation } from '@refinedev/core';
import { useEffect, useState } from 'react';
import CustomTextField from '../../components/custom/CustomText';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync: login, error } = useLogin();

  const { replace } = useNavigation();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username && password) {
      try {
        await login({ username, password });
      } catch (error) {}
    } else {
      toast('Username / Password is missing', { type: 'error' });
    }
  };

  useEffect(() => {
    if (error && error instanceof AxiosError) {
      console.log(error.response?.data);
      toast(error.response?.data.message, { type: 'error' });
    }
  }, [error]);

  return (
    <AuthPage
      type="login"
      renderContent={(content) => (
        <div className="flex flex-col items-center gap-4 font-Barlow">
          <form
            className="min-w-[50%] max-w-[80%] py-3 px-5 text-lg flex flex-col gap-2 rounded-lg shadow dark:shadow-zinc-700"
            onSubmit={handleSignIn}
          >
            <CustomTextField
              type="text"
              name="Username"
              value={username}
              callbackAction={(event) => {
                setUsername(event.target.value);
              }}
            />
            <CustomTextField
              type="password"
              name="Password"
              value={password}
              callbackAction={(event) => {
                setPassword(event.target.value);
              }}
              visibleControl
              visible={showPassword}
              setVisibleControl={setShowPassword}
            />
            <div>
              <div
                className="cursor-pointer text-xs hover:text-info-600"
                onClick={() => {
                  replace('/register');
                }}
              >
                You don't have an account? Click Me to register
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          {/* <p
            style={{
              padding: 10,
              color: '#004085',
              backgroundColor: '#cce5ff',
              borderColor: '#b8daff',
              textAlign: 'center',
            }}
          >
            email: demo@refine.dev
            <br /> password: demodemo
          </p>
          <div className="login"> {content}</div> */}
        </div>
      )}
    />
  );
};
