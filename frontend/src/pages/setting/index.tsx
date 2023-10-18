import { useNavigation } from '@refinedev/core';
import { BsChevronRight } from 'react-icons/bs';

type Props = {};

const Setting = (props: Props) => {
  const settings = [
    {
      name: 'Manage Categories',
      path: 'categories',
    },
    {
      name: 'User Profile',
      path: 'profile',
    },
    {
      name: 'Update Password',
      path: 'update-password',
    },
  ];

  const { push } = useNavigation();

  return (
    <div className="space-y-3">
      {settings.map((setting) => (
        <div
          key={setting.path}
          className="shadow dark:shadow-primary-900 p-2 cursor-pointer flex justify-between items-center hover:bg-primary-50 active:bg-primary-100 dark:hover:bg-primary-900 dark:hover:bg-opacity-40 dark:active:bg-opacity-80"
          onClick={() => {
            push(setting.path);
          }}
        >
          <span>{setting.name}</span>
          <BsChevronRight />
        </div>
      ))}
    </div>
  );
};

export default Setting;
