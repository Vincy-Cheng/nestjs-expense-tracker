import clsx from 'clsx';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { EIconName } from '../../common/icon-name.enum';
import CustomModal from '../Custom/CustomModal';
import CustomTextField from '../Custom/CustomTextField';
import IconSelector from '../IconSelector';
import { ICategory } from '../../types';
import { ECategoryType } from '../../common/category-type';
import { toast } from 'react-toastify';

type CategoryModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editCategory: ICategory;
  setEditCategory: React.Dispatch<React.SetStateAction<ICategory>>;
  calllback: (event: React.FormEvent<HTMLFormElement>) => void;
};

const CategoryModal = ({
  open,
  setOpen,
  calllback,
  editCategory,
  setEditCategory,
}: CategoryModalProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <CustomModal setOpen={setOpen}>
      <form onSubmit={calllback}>
        <div
          onClick={() => {
            toast('Category is updated!', { type: 'success' });
          }}
        >
          test
        </div>
        <div className="text-2xl">
          {editCategory.id === 0
            ? 'Add New Category for ' +
              editCategory.type.charAt(0).toUpperCase() +
              editCategory.type.slice(1)
            : 'Edit Category'}
        </div>
        {editCategory.id === 0 ? (
          <CustomTextField
            type={'text'}
            name={'Name'}
            value={editCategory['name']}
            callbackAction={(event) => {
              setEditCategory((prev) => {
                return {
                  ...prev,
                  name: event.target.value,
                };
              });
            }}
          />
        ) : (
          <div
            className="py-2 flex gap-3 items-center"
            onClick={() => {
              setEdit(true);
            }}
          >
            <div
              className={clsx(
                'text-4xl text-white rounded-full p-2',
                editCategory.type === ECategoryType.EXPENSE
                  ? 'bg-rose-400'
                  : 'bg-info-400',
              )}
            >
              <IconSelector name={editCategory.icon}></IconSelector>
            </div>
            {!edit ? (
              editCategory.name
            ) : (
              <CustomTextField
                type={'text'}
                value={editCategory['name']}
                callbackAction={(event) => {
                  setEditCategory((prev) => {
                    return {
                      ...prev,
                      name: event.target.value,
                    };
                  });
                }}
              />
            )}
          </div>
        )}

        <div>
          <p className="pb-1">Icons:</p>

          <div
            className={clsx(
              'flex flex-wrap gap-2 text-2xl',
              editCategory.type === ECategoryType.EXPENSE
                ? 'text-rose-400'
                : 'text-info-400',
            )}
          >
            {Object.values(EIconName).map((icon) => (
              <div
                key={icon}
                className={clsx(
                  'cursor-pointer rounded-md p-1',
                  {
                    'outline outline-1 bg-rose-50':
                      editCategory['icon'] === icon &&
                      editCategory.type === ECategoryType.EXPENSE,
                  },
                  {
                    'outline outline-1 bg-info-50':
                      editCategory['icon'] === icon &&
                      editCategory.type === ECategoryType.INCOME,
                  },
                  editCategory.type === ECategoryType.EXPENSE
                    ? 'hover:bg-rose-100 active:bg-rose-50'
                    : 'hover:bg-info-200 active:bg-info-100',
                )}
                onClick={() => {
                  setEditCategory((prev) => {
                    return {
                      ...prev,
                      icon: icon,
                    };
                  });
                }}
              >
                <IconSelector name={icon} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
            type="submit"
          >
            {editCategory.id === 0 ? 'Create' : 'Update'}
          </button>
        </div>

        {/* {editCategory.name ? (
          <div>{editCategory.name}</div>
        ) : (
          <form onSubmit={calllback}>
            <div className="text-2xl">
              Add New Category for{' '}
              {editCategory.type.charAt(0).toUpperCase() +
                editCategory.type.slice(1)}
            </div>
            <CustomTextField
              type={'text'}
              name={'Name'}
              value={editCategory['name']}
              callbackAction={(event) => {
                setEditCategory((prev) => {
                  return {
                    ...prev,
                    name: event.target.value,
                  };
                });
              }}
            />
            <div>
              <p className="pb-1">Icons:</p>

              <div className="flex flex-wrap gap-2 text-2xl text-primary-700">
                {Object.values(EIconName).map((icon) => (
                  <div
                    key={icon}
                    className={clsx(
                      'cursor-pointer rounded-md p-1 hover:bg-primary-200 active:bg-primary-100 ',
                      {
                        'outline outline-1 bg-primary-100':
                          editCategory['icon'] === icon,
                      },
                    )}
                    onClick={() => {
                      setEditCategory((prev) => {
                        return {
                          ...prev,
                          icon: icon,
                        };
                      });
                    }}
                  >
                    <IconSelector name={icon} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        )} */}
      </form>
    </CustomModal>
  );
};

export default CategoryModal;
