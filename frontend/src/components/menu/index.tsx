import { useMenu } from '@refinedev/core';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  const { menuItems } = useMenu();

  return (
    <div className="bg-secondary-300 dark:bg-secondary-700 rounded-md text-secondary-800 dark:text-secondary-200 h-full">
      <ul className="p-1 space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.route}
              className="flex gap-1 items-center cursor-pointer hover:bg-secondary-200 active:bg-secondary-100 dark:hover:bg-secondary-600 dark:active:bg-secondary-500 rounded-md m-1 p-1 hover:scale-105 scale-100 transition-all duration-300"
            >
              <span className="text-2xl">{item.icon}</span>

              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
