import React, { ReactElement, useRef } from 'react';
import { GrClose } from 'react-icons/gr';
type CustomModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactElement;
};

const CustomModal = ({ children, setOpen }: CustomModalProps) => {
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
        className="modal-content bg-white rounded-md m-auto p-5 shadow w-4/5 min-w-min"
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
