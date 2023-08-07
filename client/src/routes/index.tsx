import { Outlet, createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Chart from '../pages/Chart';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';
import RegisterPage from '../pages/RegisterPage';
import Record from '../pages/Record';

export const routes = {
  authRoute: [
    {
      name: 'Home',
      path: '/',
      element: <Home />,
    },
    {
      name: 'Charts',
      path: '/charts',
      element: <Chart />,
    },
    {
      name: 'Records',
      path: '/records',
      element: <Record />,
    },
  ],
  publicRoute: [
    {
      name: 'Login Page',
      path: '/login',
      element: <LoginPage />,
    },
    {
      name: 'Register Page',
      path: '/register',
      element: <RegisterPage />,
    },
  ],
};

export const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    errorElement: (
      <Layout mode="layout">
        <ErrorPage />
      </Layout>
    ),
    children: routes.authRoute.map((route) => {
      return { path: route.path, element: route.element };
    }),
  },
  {
    path: '',
    element: (
      <Layout mode="layout">
        <Outlet />
      </Layout>
    ),
    children: routes.publicRoute.map((route) => {
      return { path: route.path, element: route.element };
    }),
  },
]);
