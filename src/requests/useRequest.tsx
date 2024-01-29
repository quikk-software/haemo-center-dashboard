import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosConfig, sanitizeAxiosResponse } from "./api";
import { ResponseError, ResponseSuccess } from "./request.types";
import {
  decreaseNumberOfRequests,
  increaseNumberOfRequests,
} from "@/requests/requestSlice";
import logger from "@/core/logger";
import { useSnackbarComponent } from "@/components/layout/Snackbar";

function useRequest<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResponseSuccess<T>>();
  const [axiosResponse, setAxiosResponse] =
    useState<AxiosResponse<ResponseSuccess<T>>>();
  const dispatch = useDispatch();
  const { displaySuccess, displayWarning, displayError } =
    useSnackbarComponent();

  const handleRequest = (config: InternalAxiosRequestConfig) => {
    setIsLoading(true);
    dispatch(increaseNumberOfRequests());
    return config;
  };

  const handleResponse = (axiosResponse: AxiosResponse<ResponseSuccess<T>>) => {
    setIsLoading(false);
    dispatch(decreaseNumberOfRequests());

    setAxiosResponse(axiosResponse);

    if (axiosResponse.status < 300) {
      displaySuccess("Aktion erfolgreich");
      logger.debug("xdd");
      setData(axiosResponse.data);
    } else {
      const { errors } = axiosResponse.data as unknown as ResponseError;
      const additionalInfo = sanitizeAxiosResponse<T>(
        JSON.parse(JSON.stringify(axiosResponse)),
      );

      if (errors) {
        errors?.map((e) => {
          logger.error(e, additionalInfo);
          displayError(`${e.title}: ${e.description}`);
        });
      } else {
        logger.error(additionalInfo);
      }
    }
    return axiosResponse;
  };

  const axiosInstance = axios.create(axiosConfig);
  axiosInstance.interceptors.request.use(handleRequest);
  axiosInstance.interceptors.response.use(handleResponse);

  return {
    request: axiosInstance,
    response: axiosResponse,
    isLoading,
    data,
  };
}

export default useRequest;
