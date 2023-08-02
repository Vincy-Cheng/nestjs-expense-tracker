import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Chart from '../pages/Chart';
import LoginPage from '../pages/LoginPage';
import Layout from '../layout/Layout';

export const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'charts', element: <Chart /> },
    ],
  },
  {
    path: 'login',
    element: (
      <Layout mode="layout">
        <LoginPage />
      </Layout>
    ),
  },
]);
