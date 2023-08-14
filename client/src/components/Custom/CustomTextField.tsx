import clsx from 'clsx';
import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type CustomTextFieldProps = {
  type: string;
  name: string;
  value: string;
  callbackAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visibleControl?: boolean;
  visible?: boolean;
  setVisibleControl?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomTextField = ({
  type,
  name,
  value,
  callbackAction,
  visibleControl,
  visible,
  setVisibleControl,
}: CustomTextFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div>{name}: </div>
      <div
        className={clsx('border border-info-600 rounded-md px-2', {
          'flex justify-between items-center': visibleControl,
        })}
      >
        <input
          value={value}
          type={type === 'password' ? (visible ? 'text' : 'password') : type}
          className={clsx(
            'outline-none bg-transparent',
            visibleControl ? 'flex-1' : 'w-full',
          )}
          onChange={(e) => {
            callbackAction(e);
          }}
        />
        {visibleControl && setVisibleControl && (
          <>
            {visible ? (
              <AiOutlineEyeInvisible
                strokeWidth={1}
                className="text-info-500 cursor-pointer hover:text-info-800 active:text-info-600"
                onClick={() => {
                  setVisibleControl((prev) => !prev);
                }}
              />
            ) : (
              <AiOutlineEye
                strokeWidth={1}
                className="text-info-500 cursor-pointer hover:text-info-800 active:text-info-600"
                onClick={() => {
                  setVisibleControl((prev) => !prev);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomTextField;
