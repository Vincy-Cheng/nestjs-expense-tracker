import { ReactElement } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import clsx from 'clsx';
import NavbarOverlay from '../components/NavbarOverlay';
import { useMenu } from '../provider/MenuOpenProvider';

type LayoutProps = {
  children: ReactElement;
  mode?: 'dashboard' | 'layout';
};

const Layout = ({ children, mode }: LayoutProps) => {
  const { isSideBarOpen, toggle } = useMenu();

  return (
    <div className="grid grid-cols-5 min-h-screen h-full font-Barlow p-2 gap-2 transition-all select-none">
      {mode === 'dashboard' && (
        <div className="sm:block hidden">
          <Navbar />
        </div>
      )}

      <div
        className={clsx(
          'grow flex flex-col gap-2',
          mode === 'dashboard' ? 'sm:col-span-4 col-span-5' : 'col-span-5',
        )}
      >
        <Header />
        <div className="rounded-lg flex-1">{children}</div>
      </div>

      <div
        className={clsx(
          'sm:hidden absolute h-full top-0 left-0 z-50 transition-all duration-300 overflow-hidden',
          isSideBarOpen ? 'w-full' : 'w-0',
        )}
      >
        <NavbarOverlay />
      </div>
    </div>
  );
};

export default Layout;
