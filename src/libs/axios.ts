import { ApiConstant } from "@/constants";
import { refreshAccessToken } from "@/services/auth.service";
import { HttpCode } from "@/types/api.type";
import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import Toast from "./toastify";

const baseURL = ApiConstant.BASE_URL;

export const loginInstance = axios.create({
  baseURL,
  headers: ApiConstant.HEADER_DEFAULT,
});

const _axiosInstance = axios.create({
  baseURL,
  headers: ApiConstant.HEADER_DEFAULT,
});

function configInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use((config) => {
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

  instance.interceptors.response.use(
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
        return instance(originalRequest);
      }
      Toast.error({ message: "Fail to fetch api!" });
      return Promise.reject(error);
    }
  );
  return instance;
}

export const axiosInstanceFormFile = configInterceptors(
  axios.create({
    baseURL,
    headers: ApiConstant.HEADER_DATA_FORM_FILE,
  })
);

const axiosInstance = configInterceptors(_axiosInstance);
export default axiosInstance;
