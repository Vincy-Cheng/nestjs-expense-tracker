import { PropsWithChildren } from 'react';
import { Breadcrumb } from '../breadcrumb';
import { Menu } from '../menu';
import { useIsAuthenticated } from '@refinedev/core';
import Footer from './Footer';
import Header from './Header';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useIsAuthenticated();

  return (
    <div className="min-h-screen font-Barlow flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-primary-50 p-1">
      {data?.authenticated && <Menu />}
      <div className="content">
        <Header />
        {/* <Breadcrumb /> */}
        <div>{children}</div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
