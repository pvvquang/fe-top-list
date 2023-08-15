import { PathConstant } from "@/constants";
import axiosInstance, { loginInstance } from "@/libs/axios";
import { LoginFormState, User } from "@/types/auth.type";
import { AxiosResponse } from "axios";

export const login = async (
  formState: LoginFormState
): Promise<AxiosResponse<{ message: string; accessToken: string }>> => {
  return loginInstance.post(PathConstant.API_LOGIN, formState);
};

export const getUserInfo = async (): Promise<User> => {
  return axiosInstance.get(PathConstant.API_USER_INFO);
};
