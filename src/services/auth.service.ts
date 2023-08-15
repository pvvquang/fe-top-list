import { ApiConstant, PathConstant } from "@/constants";
import axiosInstance, { loginInstance } from "@/libs/axios";
import { LoginFormState, User } from "@/types/auth.type";
import { AxiosResponse } from "axios";

export const login = async (
  formState: LoginFormState
): Promise<
  AxiosResponse<{ message: string; accessToken: string; refreshToken: string }>
> => {
  return loginInstance.post(PathConstant.API_LOGIN, formState);
};

export const getUserInfo = async (): Promise<User> => {
  return axiosInstance.get(PathConstant.API_USER_INFO);
};

export const refreshAccessToken = async (): Promise<{
  accessToken: string;
}> => {
  const refreshToken = localStorage.getItem(ApiConstant.REFRESH_TOKEN);
  return axiosInstance.get(PathConstant.API_REFRESH_TOKEN + "/" + refreshToken);
};
