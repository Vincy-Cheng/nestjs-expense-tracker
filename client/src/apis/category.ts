import { Axios } from '.';
import { ICategory } from './type';

export async function addCategory() {}

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
