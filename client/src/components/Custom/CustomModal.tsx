import clsx from 'clsx';
import React, { ReactElement, useRef } from 'react';
import { GrClose } from 'react-icons/gr';
type CustomModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement;
  size?: 'Large' | 'Medium' | 'Small';
};

const CustomModal = ({ children, setOpen, size }: CustomModalProps) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="modal fixed w-full h-full bg-zinc-900 bg-opacity-40 overflow-auto top-0 left-0 z-50 flex justify-center items-center p-5"
      onClick={(event) => {
        if (
          modalContentRef &&
          modalContentRef.current &&
          !modalContentRef.current.contains(event.target as Node)
        )
          setOpen(false);
      }}
    >
      <div
        className={clsx(
          'modal-content bg-white rounded-md m-auto p-5 shadow min-w-min',
          size === 'Small' ? 'w-1/4' : size === 'Medium' ? 'w-1/2' : 'w-4/5',
        )}
        ref={modalContentRef}
      >
        <div
          className="float-right hover:bg-zinc-100 rounded-full p-1 cursor-pointer active:bg-zinc-200"
          onClick={() => {
            setOpen(false);
          }}
        >
          <GrClose className="" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default CustomModal;
