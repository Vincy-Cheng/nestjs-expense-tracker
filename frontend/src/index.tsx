import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeProvider } from './provider/DarkModeProvider';
import { MenuOpenProvider } from './provider/MenuOpenProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

export const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <MenuOpenProvider>
          <App />
          <ToastContainer />
        </MenuOpenProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
