import { routes } from '../routes';
import { useLocation } from 'react-router-dom';
import Setting from './Setting';

type Props = {};

const Header = (props: Props) => {
  const location = useLocation();

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
    <div className="flex justify-between">
      <div className="text-lg">{header()}</div>

      {/* <button
        onClick={() => {
          dispatch(logout());
          navigate('/login');
        }}
      >
        {isSignedIn ? 'Logout' : 'Login'}
      </button> */}
      <Setting />
    </div>
  );
};

export default Header;
