import { PropsWithChildren } from 'react';
import { Menu } from '../menu';
import { useIsAuthenticated } from '@refinedev/core';
import Footer from './Footer';
import Header from './Header';
import clsx from 'clsx';
import { useMenu } from '../../provider/MenuOpenProvider';
import Overlay from '../menu/Overlay';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useIsAuthenticated();
  const { isSideBarOpen } = useMenu();

  return (
    <div className="min-h-screen font-Barlow flex flex-col bg-white dark:bg-zinc-900 text-zinc-900 dark:text-primary-50 p-1">
      <div className="sm:px-2">
        <Header />
      </div>

      <div className="grid grid-cols-5 p-2 gap-2 transition-all select-none flex-1">
        {data?.authenticated && (
          <div className="sm:block hidden">
            <Menu />
          </div>
        )}
        <div
          className={clsx(
            'flex-1 flex flex-col gap-2 ',
            data?.authenticated ? 'sm:col-span-4 col-span-5' : 'col-span-5',
          )}
        >
          <div>{children}</div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
      <div
        className={clsx(
          'absolute bg-black bg-opacity-70 h-full w-full transition-all duration-300 z-50',
          isSideBarOpen ? 'left-0' : '-left-full',
        )}
      >
        <Overlay></Overlay>
      </div>
    </div>
  );
};
