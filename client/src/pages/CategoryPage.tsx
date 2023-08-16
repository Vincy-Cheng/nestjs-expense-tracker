import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';
import { ICategory } from '../apis/type';
import { fetchCategories } from '../apis/category';
import { useAppSelector } from '../hooks';
import { IUserInfo } from '../types';
import { profile, updateCategoryOrder } from '../apis';
import { useDndMonitor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CategoryRow from '../components/CategoryRow';
import { AxiosError } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';

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

  useDndMonitor({
    onDragEnd: (event) => {
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
    },
  });

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
  }, [categories, user]);

  return (
    <div>
      <div className="pb-3">
        <BackButton />
      </div>
      <div>
        <AiOutlinePlus className="cursor-pointer hover:bg-info-200 rounded-full active:bg-info-100" />
        Add New Category
      </div>
      <div className="flex gap-2">
        <SortableContext
          items={sortedCategories}
          strategy={verticalListSortingStrategy}
        >
          <div className="p-3 flex flex-col gap-3 bg-info-100 rounded-md">
            {sortedCategories.map((category) => (
              <div key={category.id}>
                <CategoryRow category={category} />
              </div>
            ))}
          </div>
        </SortableContext>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CategoryPage;
