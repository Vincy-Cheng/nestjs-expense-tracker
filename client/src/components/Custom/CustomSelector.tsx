import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { ChevronDown, Search } from 'tabler-icons-react';
import { useOutsideAlerter } from '../../hooks';

type CustomSelectorProps = {
  title: string;
  options: string[];
  placeholder?: string;
  filter?: boolean;
  value: any;
  callbackAction: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
};

const CustomSelector = ({
  title,
  options,
  filter,
  placeholder,
  value,
  callbackAction,
}: CustomSelectorProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: React.MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  const wrapperRef = useOutsideAlerter(handleClickOutside);

  return (
    <div className="w-full font-medium " ref={wrapperRef}>
      <div>{title}</div>
      <div
        className="w-full cursor-pointer border border-info-600 p-2 flex items-center justify-between rounded"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        ref={buttonRef}
      >
        <p className="truncate select-none">{value ? value : options[0]}</p>
        <ChevronDown />
      </div>
      <ul
        className={clsx(
          'bg-white mt-2 max-h-40 text-info-700 overflow-y-auto overflow-x-hidden z-50 absolute break-words rounded-sm transition-all duration-300',
          open ? 'visible' : 'hidden',
        )}
        ref={selectRef}
        style={{
          width: wrapperRef.current?.clientWidth,
        }}
      >
        {filter && (
          <div className="flex gap-2 sticky top-0 z-50 overflow-x-hidden mx-2 pt-2 bg-white">
            <Search className=" text-info-400" strokeWidth={1} />

            <input
              type="text"
              value={inputValue}
              className="outline-none placeholder:text-info-400 overflow-x-hidden truncate flex-1 bg-transparent"
              placeholder={placeholder}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
        )}

        {options.map((option) => (
          <li
            key={option}
            className={clsx(
              'p-2 hover:bg-info-200 relative',
              inputValue && !new RegExp(inputValue, 'i').test(option)
                ? 'hidden'
                : 'block',
            )}
            onClick={(e) => {
              if (value !== option) {
                callbackAction(e);
              }
              setOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelector;
