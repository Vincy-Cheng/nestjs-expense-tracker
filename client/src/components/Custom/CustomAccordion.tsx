import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

type CustomAccordionProps = {
  header: string;
  bgColor?: string;
  textColor?: string;
  children: ReactElement;
};

const CustomAccordion = ({
  header,
  bgColor,
  textColor,
  children,
}: CustomAccordionProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={clsx(
        'p-2 rounded w-full shadow',
        { bgColor: bgColor },
        { textColor: textColor },
      )}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full justify-between cursor-pointer items-center"
      >
        {header}
        <BsChevronDown
          className={clsx('duration-300', {
            'rotate-180': open,
          })}
        />
      </div>

      <div
        className={clsx(
          'overflow-x-auto overflow-y-hidden transition-[max-height] transition-all duration-300 ease-in-out ',
          open ? 'max-h-screen border-t mt-2' : 'max-h-0',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomAccordion;
