import { useDarkMode } from '../../provider/DarkModeProvider';
import SettingButton from '../SettingButton';
import { useMenu } from '@refinedev/core';

type Props = {};

const Header = (props: Props) => {
  const { isDarkMode } = useDarkMode();

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
      <div className="flex items-center gap-2">
        <div className="sm:hidden flex items-center">
          {/* <OpenCloseIcon
            isOpen={isSideBarOpen}
            size={24}
            stroke={2}
            color={isDarkMode ? 'white' : 'black'}
          /> */}
        </div>
        {header()}
      </div>
      <SettingButton />
    </header>
  );
};

export default Header;
