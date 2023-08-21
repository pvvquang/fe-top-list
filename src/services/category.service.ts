import { PathConstant } from "@/constants";
import axiosInstance from "@/libs/axios";
import { Category, ResponseCategory } from "@/types/category.type";
import { ListResponse } from "@/types/common.type";

export const createCategory = async (
  categoryName: string
): Promise<Category> => {
  return axiosInstance.post(PathConstant.API_CREATE_CATEGORY, { categoryName });
};

export const fetchCategories = async (
  params: string
): Promise<ListResponse<Category[]>> => {
  return axiosInstance.get(PathConstant.API_CATEGORY_BASE + params);
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
  return axiosInstance.get(PathConstant.API_CATEGORY_BASE + "/" + id);
};

export const updateCategoryById = async (
  data: Category
): Promise<ResponseCategory> => {
  return axiosInstance.put(
    PathConstant.API_CATEGORY_BASE + "/" + data.id,
    data
  );
};

export const deleteCategoryById = async (
  id: number
): Promise<ResponseCategory> => {
  return axiosInstance.delete(PathConstant.API_CATEGORY_BASE + "/" + id);
};
