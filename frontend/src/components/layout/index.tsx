import { PropsWithChildren } from 'react';
import { Breadcrumb } from '../breadcrumb';
import { Menu } from '../menu';
import { useIsAuthenticated } from '@refinedev/core';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useIsAuthenticated();

  if (!data?.authenticated) {
    return <div>{children}</div>;
  }

  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  );
};
