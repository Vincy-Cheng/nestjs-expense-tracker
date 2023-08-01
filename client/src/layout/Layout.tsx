import { ReactElement } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Navigate } from 'react-router-dom';

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-5 min-h-screen h-full font-Barlow p-2 gap-2">
      <Navbar />

      <div className="col-span-4 grow flex flex-col gap-2">
        <Header />
        <div className="bg-blue-200 rounded-lg grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
