import { useMenu } from '@refinedev/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMenu as useSideBar } from '../../provider/MenuOpenProvider';
import OpenCloseIcon from './OpenCloseIcon';
import { useDarkMode } from '../../provider/DarkModeProvider';
import clsx from 'clsx';

type Props = {};

const Overlay = (props: Props) => {
  const { menuItems } = useMenu();
  const { isSideBarOpen, toggle } = useSideBar();
  const { isDarkMode } = useDarkMode();

  return (
    <div>
      <div
        className="p-2"
        onClick={() => {
          toggle();
        }}
      >
        <OpenCloseIcon
          isOpen={isSideBarOpen}
          size={24}
          stroke={1}
          color={isDarkMode ? 'white' : 'black'}
        />
      </div>

      <ul className="p-1 space-y-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.route}
              className="text-lg hover:text-primary-200"
              onClick={() => {
                toggle();
              }}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overlay;
