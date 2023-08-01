import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>testing</div>,
    errorElement: <ErrorPage />,
  },
]);
