import { sanitizeAxiosResponse } from "./api";

type ErrorSource = "HAEMO";

export type ErrorCode = `${ErrorSource}-${string}`;

export type Error = {
  code: ErrorCode;
  title: string;
  description: string;
};

export type ResponseSuccess<T> = { payload: T };
export type ResponseError = { errors: Error[] };

export type additionalErrorInfo = ReturnType<typeof sanitizeAxiosResponse>;
export type FrontendError = Error & additionalErrorInfo;
