import { CategoryModel } from "./category-model";

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  imagePath?: string | null,
  imageFile?: File | null,
  description: string | null,
  stock: number | null,
  isActive: boolean,
  createdAt: string | null,
  updatedAt: string | null,
  categories: CategoryModel[] | null,
  categoryId: string | number | null,
  categoryName: string | null
}

export interface ProductModelPartial {
  id: number;
  name: string;
  price: number;
  imagePath?: string | null,
  imageFile?: File | null,
  categories: CategoryModel[] | null,
  categoryId: string | number | null,
  categoryName: string | null
}

