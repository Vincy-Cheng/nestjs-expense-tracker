import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '../hooks';
import Layout from './Layout';
import { logout } from '../store/userSlice';

type Props = {};

const AuthLayout = (props: Props) => {
  const { isSignedIn, access_token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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
      return <Navigate to={'/login'} />;
    }
  } catch (error) {
    dispatch(logout());
    return <Navigate to={'/login'} />;
  }

  return (
    <Layout mode="dashboard">
      <Outlet />
    </Layout>
  );
};

export default AuthLayout;
