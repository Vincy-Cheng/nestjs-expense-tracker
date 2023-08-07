import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBar, Home, ReportSearch } from 'tabler-icons-react';

type Props = {};

interface INavItem {
  name: string;
  icon: ReactElement;
  path: string;
}

const navItems: INavItem[] = [
  { name: 'Home', icon: <Home strokeWidth="1" />, path: '/' },
  { name: 'Chart', icon: <ChartBar strokeWidth="1" />, path: '/charts' },
  { name: 'Record', icon: <ReportSearch strokeWidth="1" />, path: '/records' },
  { name: 'Wallet', icon: <ReportSearch strokeWidth="1" />, path: '/wallets' },
];

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="bg-secondary-300 rounded-md text-secondary-800">
      <div
        className="text-2xl py-2 px-4 cursor-pointer w-fit"
        onClick={() => {
          navigate('/');
        }}
      >
        <p>Expense</p>
        <p>Tracker</p>
      </div>
      <div className="pt-4 text-lg flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <a
            href={item.path}
            key={item.name}
            className="flex gap-2 items-center cursor-pointer hover:bg-secondary-200 active:bg-secondary-100 rounded-md m-1 p-1 hover:scale-105 scale-100 transition-all duration-300"
          >
            {item.icon}
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
