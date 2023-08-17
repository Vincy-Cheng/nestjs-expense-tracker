import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';
import { ICategory, ICreateCategory } from '../apis/type';
import { addCategory, fetchCategories } from '../apis/category';
import { useAppSelector } from '../hooks';
import { IUserInfo } from '../types';
import { profile, updateCategoryOrder } from '../apis';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CategoryRow from '../components/CategoryRow';
import { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';
import CustomModal from '../components/Custom/CustomModal';
import CustomTextField from '../components/Custom/CustomTextField';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const CategoryPage = (props: Props) => {
  const queryClient = useQueryClient();

  const { access_token } = useAppSelector((state) => state.user);

  const decoded = jwt_decode<{
    username: string;
    sub: number;
    iat: number;
    exp: number;
  }>(access_token ?? sessionStorage.getItem('access_token') ?? '');

  const { data: categories } = useQuery<ICategory[]>(
    ['categories'],
    fetchCategories,
  );

  const { data: user } = useQuery<IUserInfo>(['user', decoded.sub], () =>
    profile(decoded.sub),
  );

  const [sortedCategories, setSortedCategories] = useState<ICategory[]>([]);

  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);

  const [openCategory, setOpenCategory] = useState<ICategory | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  // Update category order mutation
  const updateCategoryOrderMutation = useMutation<
    IUserInfo,
    AxiosError<{ error: string; message: string; statusCode: number }>,
    { id: number; categoryOrder: number[] }
  >(updateCategoryOrder, {
    onError: (error, variables, context) => {
      // Revert the cache to the previous state on error
      const typedContext = context as {
        previousUser: IUserInfo | undefined;
      };
      if (typedContext.previousUser) {
        queryClient.setQueryData<IUserInfo>(
          ['user'],
          typedContext.previousUser,
        );
      }
      toast('Failed to swap the category', { type: 'error' });
    },
  });

  // Create category mutation
  const createCategoryMutation = useMutation<
    ICategory,
    AxiosError<{ error: string; message: string; statusCode: number }>,
    Partial<ICreateCategory>
  >(addCategory, {
    onMutate: async ({ id, name, icon, type, enable }) => {
      // Optimistically update the cache
      queryClient.setQueryData<ICategory[]>(['categories'], (oldData) => {
        if (oldData) {
          return [...oldData, { id, name, icon, type, enable } as ICategory];
        }
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
      toast(error.response?.data.message ?? 'Unexpected error from server', {
        type: 'error',
      });
    },
    onSettled: () => {
      // Refetch the data to ensure it's up to date
      queryClient.invalidateQueries(['categories']);
    },
    onSuccess(data, variables, context) {
      toast(`Category is created\nName: ${data.name}\nType:${data.type}`, {
        type: 'success',
      });
    },
    retry: 3,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && user && active.id !== over.id) {
      try {
        const activeIndex = sortedCategories.findIndex(
          (item) => item.id === Number(active.id),
        );
        const overIndex = sortedCategories.findIndex(
          (item) => item.id === Number(over?.id),
        );
        const order = arrayMove(sortedCategories, activeIndex, overIndex);

        updateCategoryOrderMutation.mutateAsync({
          id: user.id,
          categoryOrder: order.map((item) => item.id),
        });
        setSortedCategories(order);
      } catch (error) {}
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    // console.log(event);
    const category = categories?.find((c) => c.id === event.active.id);
    if (category) {
      setActiveCategory(category);
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (categories && user) {
      setSortedCategories((prev) => {
        let sorted: ICategory[] = [];
        user.categoryOrder.forEach((id) => {
          const n = categories.filter((category) => category.id === Number(id));

          if (n.length > 0) {
            sorted.push(...n);
          }
        });

        return sorted;
      });
    }
    console.log(sortedCategories);
  }, [categories, user]);

  return (
    <div>
      <div className="pb-3">
        <BackButton />
      </div>
      <div
        className="w-fit flex gap-2 items-center py-2 my-2 rounded-md border border-dashed border-info-300 cursor-pointer hover:bg-primary-100 active:bg-primary-50"
        onClick={() => {
          setOpen(true);
          setOpenCategory(null);
        }}
      >
        <div className="p-1">
          <AiOutlinePlus />
        </div>
        <p className="px-2">Add New Category</p>
      </div>
      <div className="flex gap-2 md:flex-row flex-col">
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext
            items={sortedCategories}
            strategy={verticalListSortingStrategy}
          >
            <div className="p-3 flex flex-col gap-3 bg-info-100 rounded-md flex-1">
              {sortedCategories
                .filter((sorted) => sorted.type === 'expense')
                .map((category) => (
                  <div key={category.id}>
                    <CategoryRow
                      category={category}
                      setOpen={setOpen}
                      setOpenCategory={setOpenCategory}
                    />
                  </div>
                ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeCategory ? (
              <CategoryRow
                category={activeCategory}
                setOpen={setOpen}
                setOpenCategory={setOpenCategory}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedCategories}
            strategy={verticalListSortingStrategy}
          >
            <div className="p-3 flex flex-col gap-3 bg-info-100 rounded-md flex-1">
              {sortedCategories
                .filter((sorted) => sorted.type === 'income')
                .map((category) => (
                  <div key={category.id}>
                    <CategoryRow
                      category={category}
                      setOpen={setOpen}
                      setOpenCategory={setOpenCategory}
                    />
                  </div>
                ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {open && (
        <CustomModal setOpen={setOpen}>
          <div>
            {openCategory ? (
              <div>{openCategory.name}</div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast('test', { type: 'error' });
                }}
              >
                <div className="text-2xl">Add New Category</div>
                {/* <CustomTextField
                type={'text'}
                name={'Name'}
                value={newWallet.name}
                callbackAction={(event) => {
                  setNewWallet((prev) => {
                    return {
                      ...prev,
                      name: event.target.value,
                    };
                  });
                }}
              /> */}
                <div className="flex justify-end">
                  <button
                    className="bg-info-400 w-fit p-1 rounded-md text-white hover:bg-info-300 cursor-pointer active:bg-info-500 select-none"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </div>
        </CustomModal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CategoryPage;
