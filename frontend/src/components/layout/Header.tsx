import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../../provider/DarkModeProvider';
import SettingButton from '../SettingButton';
import { useMenu } from '@refinedev/core';
import OpenCloseIcon from '../menu/OpenCloseIcon';
import { useMenu as useSideBar } from '../../provider/MenuOpenProvider';

type Props = {};

const Header = (props: Props) => {
  const { isDarkMode } = useDarkMode();
  const { isSideBarOpen, toggle } = useSideBar();

  const { selectedKey, menuItems } = useMenu();

  const header = () => {
    const route = menuItems.find((item) => item.route === selectedKey);
    if (route) {
      return route.label;
    } else {
      return 'Expense Tracker';
    }
  };

  return (
    <header className="flex justify-between items-center text-lg">
      <div className="flex items-center gap-2 px-1">
        <div className="sm:hidden flex items-center">
          <div
            onClick={() => {
              toggle();
            }}
          >
            <OpenCloseIcon
              isOpen={isSideBarOpen}
              size={16}
              stroke={1}
              color={isDarkMode ? 'white' : 'black'}
            />
          </div>
        </div>
        <NavLink to={'/'}>{header()}</NavLink>
      </div>
      <SettingButton />
    </header>
  );
};

export default Header;
