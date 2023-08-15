import { ApiConstant } from "@/constants";
import { refreshAccessToken } from "@/services/auth.service";
import { HttpCode } from "@/types/api.type";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
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
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === HttpCode.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const res = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.accessToken;
      localStorage.setItem(ApiConstant.ACCESS_TOKEN, res.accessToken);
      return axiosInstance(originalRequest);
    }
    Toast.error({ message: "Fail to fetch api!" });
    return Promise.reject(error);
  }
);

export default axiosInstance;
