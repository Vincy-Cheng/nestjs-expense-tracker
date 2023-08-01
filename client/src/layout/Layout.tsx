import React, { ReactElement } from 'react';
import Header from '../components/Header';

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
