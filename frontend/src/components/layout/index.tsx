import { PropsWithChildren } from 'react';
import { Breadcrumb } from '../breadcrumb';
import { Menu } from '../menu';
import { useIsAuthenticated } from '@refinedev/core';
import Footer from './Footer';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useIsAuthenticated();
  console.log(data?.authenticated);

  return (
    <div className="min-h-screen font-Barlow flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-primary-50">
      {!data?.authenticated ? (
        <div>{children}</div>
      ) : (
        <div className="layout">
          <Menu />
          <div className="content">
            <Breadcrumb />
            <div>{children}</div>
          </div>
        </div>
      )}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};
