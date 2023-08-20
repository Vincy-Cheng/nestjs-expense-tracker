import { Axios } from '.';
import { ICategory, ICreateCategory } from '../types';

export async function addCategory(
  newCategory: Partial<ICreateCategory>,
): Promise<ICategory> {
  const res = await Axios.post('v1/categories', newCategory);
  return res.data;
}

export async function fetchCategories(): Promise<ICategory[]> {
  const response = await Axios.get('/v1/categories');
  return response.data;
}

export async function updateCategory(
  category: Partial<ICategory>,
): Promise<ICategory> {
  const res = await Axios.patch(`/v1/categories/${category.id}`, {
    icon: category.icon,
    name: category.name,
    enable: category.enable,
  });

  return res.data;
}
