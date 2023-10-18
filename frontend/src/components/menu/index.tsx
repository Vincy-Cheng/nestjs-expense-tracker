import { useMenu } from '@refinedev/core';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <NavLink to={item.route}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
