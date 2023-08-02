import { ReactElement } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import clsx from 'clsx';

type LayoutProps = {
  children: ReactElement;
  mode?: 'dashboard' | 'layout';
};

const Layout = ({ children, mode }: LayoutProps) => {
  return (
    <div className="grid grid-cols-5 min-h-screen h-full font-Barlow p-2 gap-2">
      {mode === 'dashboard' && <Navbar />}
      {/* <Navbar /> */}

      <div
        className={clsx(
          'grow flex flex-col gap-2',
          mode === 'dashboard' ? 'col-span-4 ' : 'col-span-5',
        )}
      >
        <Header />
        <div className="rounded-lg grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
