import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Chart from '../pages/Chart';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  { path: 'charts', element: <Chart /> },
]);
