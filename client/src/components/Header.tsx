import { routes } from '../routes';
import { useLocation } from 'react-router-dom';
import Setting from './Setting';
import { useMenu } from '../provider/MenuOpenProvider';
import OpenCloseIcon from './OpenCloseIcon';

type Props = {};

const Header = (props: Props) => {
  const location = useLocation();

  const { isSideBarOpen, toggle } = useMenu();

  const header = () => {
    const authRoute = routes.authRoute.find(
      (route) => route.path === location.pathname,
    );

    if (authRoute) {
      return authRoute.name;
    } else {
      return ' Expense Tracker';
    }
  };

  return (
    <header className="flex justify-between items-center text-lg">
      <div className="flex items-center gap-2">
        <div className="sm:hidden" onClick={toggle}>
          <OpenCloseIcon isOpen={isSideBarOpen} size={16} />
        </div>
        {header()}
      </div>
      <Setting />
    </header>
  );
};

export default Header;
