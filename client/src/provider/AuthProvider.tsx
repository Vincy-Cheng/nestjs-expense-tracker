import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import jwt_decode from 'jwt-decode';
import { logout } from '../store/userSlice';

interface ProviderValue {
  authorized: boolean;
  isSignedIn: boolean;
  userId?: number;
}

const AuthContext = React.createContext<any>({});

export const useAuth = () => {
  return useContext<ProviderValue>(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [userId, setUserId] = useState<number>();

  const { access_token, isSignedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const decoded = jwt_decode<{
        username: string;
        sub: number;
        iat: number;
        exp: number;
      }>(access_token ?? sessionStorage.getItem('access_token') ?? '');

      // Check expiration time
      const today = new Date();

      if (today.getTime() / 1000 > decoded.exp || !isSignedIn) {
        dispatch(logout());
        setAuthorized(false);
      } else {
        setAuthorized(true);
        setUserId(decoded.sub);
      }
    } catch (error) {
      dispatch(logout());
      setAuthorized(false);
    }
  }, [access_token, dispatch, isSignedIn]);

  return (
    <AuthContext.Provider value={{ authorized, isSignedIn, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
