import { ReactElement } from 'react';
import { ChartBar, Home } from 'tabler-icons-react';

type Props = {};

interface INavItem {
  name: string;
  icon: ReactElement;
  path: string;
}

const navItems: INavItem[] = [
  { name: 'Home', icon: <Home strokeWidth="1" />, path: '/' },
  { name: 'Chart', icon: <ChartBar strokeWidth="1" />, path: '/charts' },
];

const Navbar = (props: Props) => {
  return (
    <div className="bg-primary-300 rounded-md text-primary-800">
      <div className="text-2xl p-2">
        <p>Expense</p>
        <p>Tracker</p>
      </div>
      <div className="pt-4 text-lg flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            href={item.path}
            key={item.name}
            className="flex gap-2 items-center cursor-pointer hover:bg-primary-200 rounded-md m-1 p-1"
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
