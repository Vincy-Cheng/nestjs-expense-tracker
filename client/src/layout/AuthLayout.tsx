import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useAppSelector } from '../hooks';
import Layout from './Layout';

type Props = {};

const AuthLayout = (props: Props) => {
  const { isSignedIn, access_token } = useAppSelector((state) => state.user);
  try {
    const decoded = jwt_decode(
      access_token ?? sessionStorage.getItem('access_token') ?? '',
    );
  } catch (error) {
    return <Navigate to={'/login'} />;
  }

  if (!isSignedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <Layout mode="dashboard">
      <Outlet />
    </Layout>
  );
};

export default AuthLayout;
