import { ApiConstant } from "@/constants";
import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import Toast from "./toastify";

const baseURL = ApiConstant.BASE_URL;

export const loginInstance = axios.create({
  baseURL,
  headers: ApiConstant.HEADER_DEFAULT,
});

export const axiosInstance = axios.create({
  baseURL,
  headers: ApiConstant.HEADER_DEFAULT,
});

axiosInstance.interceptors.request.use((config) => {
  let accessToken: string = "";
  if (ApiConstant.ENVIRONMENT === "development") {
    accessToken =
      localStorage.getItem(ApiConstant.ACCESS_TOKEN as string) || "";
  }

  if (!accessToken) return config;
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: "Bearer " + accessToken,
    } as AxiosRequestHeaders,
  };
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (error: AxiosError<{ message: string }>) => {
    Toast.error({ message: "Fail to fetch api!" });
    return Promise.reject(error);
  }
);

export default axiosInstance;
