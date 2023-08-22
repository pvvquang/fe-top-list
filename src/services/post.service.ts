import { PathConstant } from "@/constants";
import axiosInstance, { axiosInstanceFormFile } from "@/libs/axios";
import { IPost } from "@/types/post.type";

export const createNewPost = async (data: FormData) => {
  return axiosInstanceFormFile.post(PathConstant.API_CREATE_POST, data);
};

export const getPostById = async (id: string): Promise<IPost> => {
  return axiosInstance.get(PathConstant.API_POSTS_BASE + "/" + id);
};

export const getPostBySlug = async (slug: string): Promise<IPost> => {
  return axiosInstance.get(PathConstant.API_POSTS_BY_SLUG + "/" + slug);
};

export const updatePost = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}): Promise<IPost> => {
  return axiosInstance.put(PathConstant.API_POSTS_BASE + "/" + id, data);
};

export const deletePostById = async (id: string): Promise<IPost> => {
  return axiosInstance.delete(PathConstant.API_POSTS_BASE + "/" + id);
};
