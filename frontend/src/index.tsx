import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from './provider/DarkModeProvider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <App />
        <ToastContainer />
      </DarkModeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
