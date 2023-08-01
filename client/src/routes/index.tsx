import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthLayout from '../pages/auth/AuthLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Chart from '../pages/Chart';
import LoginPage from '../pages/LoginPage';

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
  { path: 'login', element: <LoginPage /> },
]);

// export const router = createBrowserRouter([
//   {
//     path: '',
//     element: <Home />,
//     errorElement: <ErrorPage />,
//   },
//   // { path: '/', element: <Home /> },
//   { path: 'charts', element: <Chart /> },
// ]);

// export const router = createBrowserRouter(
//   createRoutesFromElements(<Route element={<AuthLayout />}>

// 	</Route>),
// );
