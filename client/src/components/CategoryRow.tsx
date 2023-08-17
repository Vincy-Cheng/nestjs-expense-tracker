import { CSS } from '@dnd-kit/utilities';
import { ICategory } from '../apis/type';
import { useSortable } from '@dnd-kit/sortable';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import IconSelector from './IconSelector';
import CustomSwitch from './Custom/CustomSwitch';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { updateCategory } from '../apis/category';
import clsx from 'clsx';

type CategoryRowProps = {
  category: ICategory;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
};

const CategoryRow = ({
  category: { id, name, icon, enable, type },
  setOpen,
  setOpenCategory,
}: CategoryRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const queryClient = useQueryClient();

  // Update category mutation
  const updateCategoryMutation = useMutation<
    ICategory,
    AxiosError<{ error: string; message: string; statusCode: number }>,
    ICategory
  >(updateCategory, {
    onMutate: async (newCategory) => {
      // Optimistically update the cache
      queryClient.setQueryData<ICategory[]>(['categories'], (oldData) => {
        if (oldData) {
          oldData.forEach((old) => {
            if (old.id === newCategory.id) {
              old.icon = newCategory.icon;
              old.name = newCategory.name;
              old.enable = newCategory.enable;
            }
          });
        }
        console.log(oldData);
        return oldData;
      });

      return {
        previousWallets: queryClient.getQueryData<ICategory[]>(['categories']),
      };
    },
    onError: (error, variables, context) => {
      // Revert the cache to the previous state on error
      const typedContext = context as {
        previousCategories: ICategory[] | undefined;
      };

      if (typedContext.previousCategories) {
        queryClient.setQueryData<ICategory[]>(
          ['wallets'],
          typedContext.previousCategories,
        );
      }
      toast('Failed to enable the category', { type: 'error' });
    },
    onSettled: () => {
      // Refetch the data to ensure it's up to date
      queryClient.invalidateQueries(['wallets']);
    },

    retry: 3,
  });

  return (
    <div
      className={clsx(
        'flex justify-between items-center text-4xl text-white rounded-md p-1',
        type === 'income' ? 'bg-info-400' : 'bg-rose-400',
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        setOpen(true);
        setOpenCategory({ id, name, icon, enable, type });
      }}
    >
      <div className="flex gap-2 items-center">
        <PiDotsSixVerticalBold className="text-base" />
        <IconSelector name={icon} />
        <p className="text-sm">{name}</p>
      </div>

      <CustomSwitch
        on={enable}
        toggle={async () => {
          try {
            await updateCategoryMutation.mutateAsync({
              id,
              icon,
              name,
              enable: !enable,
              type,
            });
          } catch (error) {}
        }}
        size={20}
        enableColor="peer-checked:bg-primary-400"
      />
      {/* <div className="absolute p-1 rounded-full -right-2 -top-2 bg-rose-200">
        <BiDotsVerticalRounded size={12} />
      </div> */}
    </div>
  );
};

export default CategoryRow;
