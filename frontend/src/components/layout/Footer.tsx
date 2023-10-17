import React from 'react';
import { PiMoonStarsThin, PiSunThin } from 'react-icons/pi';
import { clsx } from 'clsx';
import { useDarkMode } from '../../provider/DarkModeProvider';

type Props = {};

const Footer = (props: Props) => {
  const { enable, disable, isDarkMode } = useDarkMode();
  return (
    <div className="p-1 text-right flex justify-end gap-2 text-xl">
      <div
        className={clsx(
          'p-1 hover:bg-zinc-100 rounded-full cursor-pointer dark:hover:bg-opacity-30',
          {
            'text-amber-400': !isDarkMode,
          },
        )}
        onClick={() => disable()}
      >
        <PiSunThin />
      </div>
      <div
        className={clsx(
          'p-1 hover:bg-zinc-100 rounded-full cursor-pointer dark:hover:bg-opacity-30',
          {
            'text-indigo-300': isDarkMode,
          },
        )}
        onClick={() => enable()}
      >
        <PiMoonStarsThin />
      </div>
    </div>
  );
};

export default Footer;
