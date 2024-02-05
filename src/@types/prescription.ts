/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetPrescriptionResponse {
  id?: number;
  patientId?: number;
  professionalId?: number;
  bodyWeight?: number;
  bodyHeight?: number;
  preparation?: string;
  dosage?: string;
  dosageUnit?: string;
  risk?: string;
  note?: string;
  isAccepted?: boolean;
  hasWarning?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostPrescriptionRequest {
  professionalId: number;
  bodyWeight: number;
  bodyHeight: number;
  note?: string;
}

export interface PostPrescriptionResponse {
  id?: number;
}

export interface ListPrescriptionsResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  prescriptions: GetPrescriptionResponse[];
}

export interface PatchPrescriptionRequest {
  prescriptionId: number;
  preparation: string;
  dosage: string;
  dosageUnit: string;
  risk: string;
}

export interface GetPrescriptionUserResponse {
  id?: number;
  userId?: string;
  centerId?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  roles: string[];
}

export interface PostPrescriptionUserRequest {
  firstName: string;
  lastName: string;
  birthday: string;
}

export interface PostPrescriptionUserResponse {
  id?: number;
}

export interface ListPrescriptionUsersResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  prescriptionUsers: GetPrescriptionUserResponse[];
}

export interface PatchPrescriptiongUserRequest {
  prescriptionUserId: number;
  centerId?: boolean;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  roles?: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:3005/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === "number" ? value : `${value}`,
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Prescription Service
 * @version 0.1.0
 * @baseUrl http://localhost:3005/
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description The requesting user needs to be a center and can only delete prescriptions of related professionals.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsCenterDelete
     * @summary Deletes a prescription by its ID and by a center user.
     * @request DELETE:/api/v1/prescriptions/{id}/center
     * @secure
     */
    v1PrescriptionsCenterDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/prescriptions/${id}/center`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must either be the patient or the professional of the prescription, else an Unauthorized-Exception will be thrown
     *
     * @tags Prescriptions
     * @name V1PrescriptionsDetail
     * @summary Gets a prescription by its ID.
     * @request GET:/api/v1/prescriptions/{id}
     * @secure
     */
    v1PrescriptionsDetail: (id: number, params: RequestParams = {}) =>
      this.request<GetPrescriptionResponse, void>({
        path: `/api/v1/prescriptions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Requieres the requesting user to be the professional of the prescription, else an Unauthorized-Exception is thrown
     *
     * @tags Prescriptions
     * @name V1PrescriptionsDelete
     * @summary Deletes a prescription by its ID.
     * @request DELETE:/api/v1/prescriptions/{id}
     * @secure
     */
    v1PrescriptionsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/prescriptions/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a patient, else an Unauthorized-Exception will be thrown.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsCreate
     * @summary Creates a new prescription.
     * @request POST:/api/v1/prescriptions
     * @secure
     */
    v1PrescriptionsCreate: (
      data: PostPrescriptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostPrescriptionResponse, void>({
        path: `/api/v1/prescriptions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all prescription where the user is either patient or professional
     *
     * @tags Prescriptions
     * @name V1PrescriptionsList
     * @summary Lists all prescriptions of the user
     * @request GET:/api/v1/prescriptions
     * @secure
     */
    v1PrescriptionsList: (
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListPrescriptionsResponse, void>({
        path: `/api/v1/prescriptions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be the professional of the prescription, else an Unauthorized-Exception will be thrown.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsPartialUpdate
     * @summary Updates an existing prescription.
     * @request PATCH:/api/v1/prescriptions
     * @secure
     */
    v1PrescriptionsPartialUpdate: (
      data: PatchPrescriptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/prescriptions`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Route gets all prescriptions related to the center.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsCenterAllPrescriptionsList
     * @summary Lists all prescriptions of the center
     * @request GET:/api/v1/prescriptions/center/all-prescriptions
     * @secure
     */
    v1PrescriptionsCenterAllPrescriptionsList: (
      query?: {
        /** Filters all accepted prescriptions. */
        isAccepted?: boolean;
        /** Indicator how to sort prescriptions by date. */
        sort?: string;
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListPrescriptionsResponse, void>({
        path: `/api/v1/prescriptions/center/all-prescriptions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a center and can only update prescriptions of related professionals.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsCenterPartialUpdate
     * @summary Updates an existing prescription by center user.
     * @request PATCH:/api/v1/prescriptions/center
     * @secure
     */
    v1PrescriptionsCenterPartialUpdate: (
      data: PatchPrescriptionRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/prescriptions/center`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The requesting user must be a center or admin and the user must be related to only a requesting center.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsUserDetail
     * @summary Lists all prescriptions of a user for a requesting center or admin.
     * @request GET:/api/v1/prescriptions/user/{userId}
     * @secure
     */
    v1PrescriptionsUserDetail: (
      userId: string,
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListPrescriptionsResponse, void>({
        path: `/api/v1/prescriptions/user/${userId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be the professional of the prescription, else an Unauthorized-Exception will be thrown.
     *
     * @tags Prescriptions
     * @name V1PrescriptionsAcceptDetail
     * @summary Accepts a prescription.
     * @request GET:/api/v1/prescriptions/accept/{id}
     * @secure
     */
    v1PrescriptionsAcceptDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/prescriptions/accept/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a professional or the prescriptionUser himself, else an Unauthorized-Exception will be thrown
     *
     * @tags Prescription User
     * @name V1PrescriptionUsersDetail
     * @summary Get a prescriptionUsers by its ID
     * @request GET:/api/v1/prescriptionUsers/{id}
     * @secure
     */
    v1PrescriptionUsersDetail: (id: number, params: RequestParams = {}) =>
      this.request<GetPrescriptionUserResponse, void>({
        path: `/api/v1/prescriptionUsers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Requieres the requesting user to be the prescriptionUser or the corresponding professional/center, else an Unauthorized-Exception is thrown
     *
     * @tags Prescription User
     * @name V1PrescriptionUsersDelete
     * @summary Deletes a prescriptionUser by its ID.
     * @request DELETE:/api/v1/prescriptionUsers/{id}
     * @secure
     */
    v1PrescriptionUsersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/prescriptionUsers/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Users with center or admin role are allowed to fetch the prescription user.
     *
     * @name V1PrescriptionUsersCenterDetail
     * @summary Gets a prescription user by ID.
     * @request GET:/api/v1/prescriptionUsers/center/{prescriptionUserId}
     * @secure
     */
    v1PrescriptionUsersCenterDetail: (
      prescriptionUserId: number,
      params: RequestParams = {},
    ) =>
      this.request<GetPrescriptionUserResponse, void>({
        path: `/api/v1/prescriptionUsers/center/${prescriptionUserId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with center or admin role are allowed to fetch the prescription user.
     *
     * @name V1PrescriptionUsersCenterUsersDetail
     * @summary Gets a prescription user by user ID.
     * @request GET:/api/v1/prescriptionUsers/center/users/{userId}
     * @secure
     */
    v1PrescriptionUsersCenterUsersDetail: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetPrescriptionUserResponse, void>({
        path: `/api/v1/prescriptionUsers/center/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a patient or a center, else Forbidden-Exception will be thrown
     *
     * @tags Prescription User
     * @name V1ProfessionalsPrescriptionUsersList
     * @summary Lists professional prescription users by center ID of a patient user
     * @request GET:/api/v1/professionals/prescriptionUsers
     * @secure
     */
    v1ProfessionalsPrescriptionUsersList: (
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListPrescriptionUsersResponse, void>({
        path: `/api/v1/professionals/prescriptionUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Prescription User
     * @name V1PrescriptionUsersCreate
     * @summary Creates a new prescriptionUser.
     * @request POST:/api/v1/prescriptionUsers
     * @secure
     */
    v1PrescriptionUsersCreate: (
      data: PostPrescriptionUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostPrescriptionUserResponse, void>({
        path: `/api/v1/prescriptionUsers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a professional or a center, else an Unauthorized-Exception will be thrown
     *
     * @tags Prescription User
     * @name V1PrescriptionUsersList
     * @summary Lists all prescriptionUsers
     * @request GET:/api/v1/prescriptionUsers
     * @secure
     */
    v1PrescriptionUsersList: (params: RequestParams = {}) =>
      this.request<ListPrescriptionUsersResponse, void>({
        path: `/api/v1/prescriptionUsers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The update-api does not directly accept roles and centers. Instead, if the "roles" or "center" parameter is true, it fetches the roles/center from the keycloak token and updates them. If the roles are changed in keycloak, you have to request a new token in order for this API to see the changes.
     *
     * @tags Prescription User
     * @name V1PrescriptionUsersPartialUpdate
     * @summary Updates an existing prescriptionUser.
     * @request PATCH:/api/v1/prescriptionUsers
     * @secure
     */
    v1PrescriptionUsersPartialUpdate: (
      data: PatchPrescriptiongUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/prescriptionUsers`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
