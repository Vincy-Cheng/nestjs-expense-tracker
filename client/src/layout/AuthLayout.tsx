import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import Layout from './Layout';

type Props = {};

const AuthLayout = (props: Props) => {
  const { isSignedIn } = useAppSelector((state) => state.user);
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
