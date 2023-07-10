import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseSuccess } from "./request.types";

export const axiosConfig: AxiosRequestConfig = {
  // handle any status without throwing error
  validateStatus: () => true,
};
export const backendAxios = axios.create(axiosConfig);

export function sanitizeAxiosResponse<T>(
  axiosResponse: AxiosResponse<ResponseSuccess<T>>,
) {
  const { method, url, data: dataString } = axiosResponse.config;

  const body = dataString ? JSON.parse(dataString) : "";

  const { status, statusText, data } = axiosResponse;

  return {
    axiosResponse,
    method,
    url,
    body,
    data,
    status,
    statusText,
  };
}
