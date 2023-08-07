import { useAppDispatch, useAppSelector } from '../hooks';
import { routes } from '../routes';
import { logout } from '../store/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

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

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        {isSignedIn ? (
          <>Logout</>
        ) : (
          <div
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </div>
        )}
      </button>
    </div>
  );
};

export default Header;
