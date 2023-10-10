import { AuthPage, useLogin } from '@refinedev/core';
import { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate: login } = useLogin();

  return (
    <AuthPage
      type="login"
      renderContent={(content) => (
        <div>
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
