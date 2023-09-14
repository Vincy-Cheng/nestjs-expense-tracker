import clsx from 'clsx';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { useOutsideAlerter } from '../../hooks';

type CustomAccordionProps = {
  header: string | ReactElement;
  customClass?: string;
  children: ReactElement;
  childClass?: string;
  triggerUpdate?: any;
  arrowPosition?: 'Left' | 'Right';
  hideArrow?: boolean;
  focus?: boolean;
};

const CustomAccordion = ({
  header,
  customClass,
  children,
  childClass,
  triggerUpdate,
  arrowPosition,
  hideArrow,
  focus,
}: CustomAccordionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [contentHeight, setContentHeight] = useState(0);

  const childRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (accordionRef.current) {
      if (focus) {
        if (accordionRef.current.contains(event.target as Node)) {
          setOpen((prev) => !prev);
        } else {
          setOpen(false);
        }
      } else {
        if (accordionRef.current.contains(event.target as Node)) {
          setOpen((prev) => !prev);
        }
      }
    }
  };

  useOutsideAlerter(handleClickOutside);

  useEffect(() => {
    if (childRef.current) {
      setContentHeight(childRef.current?.scrollHeight);
    }
  }, [triggerUpdate, open]);

  return (
    <div
      ref={accordionRef}
      className={clsx(
        'accordion p-2 rounded w-full shadow flex flex-col',
        customClass,
      )}
    >
      <div
        className={clsx(
          'flex w-full justify-between cursor-pointer items-center',
          arrowPosition === 'Right' ? 'flex-row-reverse' : '',
        )}
      >
        <span className="flex-1" ref={accordionRef}>
          {header}
        </span>

        <BsChevronDown
          className={clsx(
            'duration-300',
            {
              'rotate-180': open,
            },
            {
              ['hidden']: hideArrow,
            },
          )}
        />
      </div>

      <div
        // transition animation need to be first, CSS issue
        className={clsx(
          open ? childClass : '',
          'transition-[max-height] transition-all duration-500 ease-in-out overflow-x-auto overflow-y-hidden',
        )}
        style={{ maxHeight: open ? contentHeight : 0 }}
        ref={childRef}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomAccordion;
