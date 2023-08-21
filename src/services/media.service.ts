import { PathConstant } from "@/constants";
import axiosInstance, { axiosInstanceFormFile } from "@/libs/axios";
import { ResponseCategory } from "@/types/category.type";
import { ListResponse } from "@/types/common.type";
import { IMedia } from "@/types/media.type";

export const createMedia = async (data: FormData): Promise<IMedia> => {
  return axiosInstanceFormFile.post(PathConstant.API_CREATE_MEDIA, data);
};

export const fetchListMedia = async (
  params: string
): Promise<ListResponse<IMedia[]>> => {
  return axiosInstance.get(PathConstant.API_MEDIA_BASE + params);
};

export const fetchMediaByKey = async (key: number): Promise<IMedia> => {
  return axiosInstance.get(PathConstant.API_MEDIA_BASE + "/" + key);
};

export const deleteMediaByKey = async (
  key: string
): Promise<Partial<ResponseCategory>> => {
  return axiosInstance.delete(PathConstant.API_CATEGORY_BASE + "/" + key);
};
