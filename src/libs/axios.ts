import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import Toast from "./toastify";

const axiosInstance = {
  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) {
    try {
      const res = await axios.get(url, config);
      return res.data;
    } catch (error: any) {
      Toast.error({ message: error.data.error });
    }
  },
  async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) {
    try {
      const res = await axios.post(url, data, config);
      return res.data;
    } catch (error: any) {
      Toast.error({ message: error.data.error });
    }
  },
  async put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) {
    try {
      const res = await axios.put(url, data, config);
      return res.data;
    } catch (error: any) {
      Toast.error({ message: error.data.error });
    }
  },
  async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) {
    try {
      const res = await axios.delete(url, config);
      return res.data;
    } catch (error: any) {
      Toast.error({ message: error.data.error });
    }
  },
};

export default axiosInstance;
