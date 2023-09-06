import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { MenuOpenProvider } from './provider/MenuOpenProvider';
import { RecordDateProvider } from './provider/RecordDataProvider';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MenuOpenProvider>
          <RecordDateProvider>
            <RouterProvider router={router} />
          </RecordDateProvider>
        </MenuOpenProvider>
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
