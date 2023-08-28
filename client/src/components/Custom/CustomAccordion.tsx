import clsx from 'clsx';
import { ReactElement, useRef, useState } from 'react';
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

  const [contentHeight, setContentHeight] = useState(0);

  const childRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={clsx(
        'p-2 rounded w-full shadow flex flex-col',
        { bgColor: bgColor },
        { textColor: textColor },
      )}
      onClick={() => {
        setOpen((prev) => !prev);
        if (childRef.current) {
          setContentHeight(childRef.current?.scrollHeight);
        }
      }}
    >
      <div className="flex w-full justify-between cursor-pointer items-center">
        {header}
        <BsChevronDown
          className={clsx('duration-300', {
            'rotate-180': open,
          })}
        />
      </div>

      <div
        // transition animation need to be first, CSS issue
        className={
          'transition-[max-height] duration-500 ease-in-out overflow-x-auto overflow-y-hidden'
        }
        style={{ maxHeight: open ? contentHeight : 0 }}
        ref={childRef}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomAccordion;
