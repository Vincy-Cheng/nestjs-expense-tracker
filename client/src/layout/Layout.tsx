import React, { ReactElement } from 'react';

type LayoutProps = {
  children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div>Title</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
