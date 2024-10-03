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

export interface PostUserRequest {
  /** @default "johndoe1" */
  alias?: string;
  /** @default "johndoe@quikk.de" */
  email?: string;
  /** @default "1234JohnDoe!" */
  password?: string;
  /** @default "John" */
  firstName?: string;
  /** @default "Doe" */
  lastName?: string;
  /** @default "patient" */
  role?: string;
  phoneNumber?: string;
  /** @default "YYYY-MM-DD" */
  birthDay?: string;
  /** @default "Valid center ID here!" */
  centerId?: string;
  avatar?: string;
}

export interface PatchUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  birthDay?: string;
}

export interface PatchUserAliasRequest {
  alias?: string;
}

export interface PatchUserCenterRequest {
  businessLocationNumber?: string;
  role?: string;
}

export interface PostCenterUserRequest {
  alias?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  centerName?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  businessLocationNumber?: string;
  avatar?: string;
}

export interface PatchCenterUserRequest {
  centerName?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  businessLocationNumber?: string;
  avatar?: string;
}

export interface PostUserResponse {
  id?: string;
}

export interface GetUserResponse {
  id?: string;
  alias?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  phoneNumber?: string;
  birthDay?: string;
  centerId?: string;
  avatar?: string;
  enabled?: boolean;
  verifiedEmail?: boolean;
  blocked?: boolean;
  createdAt?: string;
}

export interface GetCenterUserResponse {
  id?: string;
  alias?: string;
  email?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  centerName?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  businessLocationNumber?: string;
  enabled?: boolean;
  blocked?: boolean;
  createdAt?: string;
}

export interface ListUsersResponse {
  users: GetUserResponse[];
}

export interface ListCenterUsersResponse {
  centers: GetCenterUserResponse[];
}

export interface PostUserAvatarRequest {
  image: string;
  imageMIMEType: string;
}

export interface PostUserAvatarResponse {
  userAvatarId?: number;
}

export interface GetUserAvatarRequest {
  id: string;
  userId: string;
  image: string;
  imageMIMEType: string;
}

export interface PostRequestPasswordRequest {
  email: string;
}

export interface PostResetPasswordRequest {
  newPassword: string;
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
  public baseUrl: string = "http://localhost:3004/";
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
 * @title User Service
 * @version 0.1.0
 * @baseUrl http://localhost:3004/
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description This route only returns the user related to the ID found in the requesting access token.
     *
     * @tags Users
     * @name V1UsersUserList
     * @summary Gets the authenticated user
     * @request GET:/api/v1/users/user
     * @secure
     */
    v1UsersUserList: (params: RequestParams = {}) =>
      this.request<GetUserResponse, void>({
        path: `/api/v1/users/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Only non-dependent user attributes like first name, last name, birthday etc. can be updated. The user ID from the access token will be used for identifying the corresponding Keycloak user.
     *
     * @tags Users
     * @name V1UsersUserPartialUpdate
     * @summary Updates a user
     * @request PATCH:/api/v1/users/user
     * @secure
     */
    v1UsersUserPartialUpdate: (
      data: PatchUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/users/user`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This route can only be used by centers and admins. An user must be related to an authenticated center.
     *
     * @tags Users
     * @name V1UsersUserDetail
     * @summary Gets an user by ID
     * @request GET:/api/v1/users/user/{userId}
     * @secure
     */
    v1UsersUserDetail: (userId: string, params: RequestParams = {}) =>
      this.request<GetUserResponse, void>({
        path: `/api/v1/users/user/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Only the authenticated user's alias will be updated. The user ID from the access token will be used for identifying the corresponding Keycloak user. The alias can only be updated once in a 30 days time period.
     *
     * @tags Users
     * @name V1UsersUserAliasPartialUpdate
     * @summary Updates a user's alias
     * @request PATCH:/api/v1/users/user/alias
     * @secure
     */
    v1UsersUserAliasPartialUpdate: (
      data: PatchUserAliasRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/users/user/alias`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Only the authenticated user's center will be updated. The user ID from the access token will be used for identifying the corresponding Keycloak user. The user needs to be re-activated by the new center or an admin.
     *
     * @tags Users
     * @name V1UsersUserAssignCenterPartialUpdate
     * @summary Updates a user's center
     * @request PATCH:/api/v1/users/user/assign-center
     * @secure
     */
    v1UsersUserAssignCenterPartialUpdate: (
      data: PatchUserCenterRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/users/user/assign-center`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersCreate
     * @summary Creates a new user.
     * @request POST:/api/v1/users
     * @secure
     */
    v1UsersCreate: (data: PostUserRequest, params: RequestParams = {}) =>
      this.request<PostUserResponse, void>({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The query of the request can be used to filter. Use the format 'q=<attribute>:<value>'. Nested attributes are automatically considered by just passing the attributes name without any parent attribut keys. Use whitespaces to include multiple attributes to query. Using this route, only users related to the center ID specified in the authenticated users token are fetched. The authenticated user must be related to the role "center".
     *
     * @tags Users
     * @name V1UsersList
     * @summary Gets all users.
     * @request GET:/api/v1/users
     * @secure
     */
    v1UsersList: (
      query: {
        /** The query of the request, which is used to filter results. The format is 'q=<attribute1>:<value1> <attribute2>:<value2>...' */
        q?: string;
        /** Number of users. Default is 20. */
        pageSize: number;
        /** Current page of requesting users. Default is 0. */
        pageNumber: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListUsersResponse, void>({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This route returns a center user by its business location number.
     *
     * @tags Users
     * @name V1UsersCentersBusinessLocationNumberDetail
     * @summary Gets a center user by its business location number.
     * @request GET:/api/v1/users/centers/business-location-number/{businessLocationNumber}
     * @secure
     */
    v1UsersCentersBusinessLocationNumberDetail: (
      businessLocationNumber: string,
      params: RequestParams = {},
    ) =>
      this.request<GetCenterUserResponse, void>({
        path: `/api/v1/users/centers/business-location-number/${businessLocationNumber}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This route returns a center user by its user ID.
     *
     * @tags Users
     * @name V1UsersCentersDetail
     * @summary Gets a center user.
     * @request GET:/api/v1/users/centers/{centerUserId}
     * @secure
     */
    v1UsersCentersDetail: (centerUserId: string, params: RequestParams = {}) =>
      this.request<GetCenterUserResponse, void>({
        path: `/api/v1/users/centers/${centerUserId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This route returns all center users. No authentication needed and no further filtering possible.
     *
     * @tags Users
     * @name V1UsersCentersList
     * @summary Gets all center users.
     * @request GET:/api/v1/users/centers
     * @secure
     */
    v1UsersCentersList: (
      query: {
        /** Number of users. Default is 20. */
        pageSize: number;
        /** Current page of requesting users. Default is 0. */
        pageNumber: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListCenterUsersResponse, void>({
        path: `/api/v1/users/centers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersCenterCreate
     * @summary Create a center user
     * @request POST:/api/v1/users/center
     * @secure
     */
    v1UsersCenterCreate: (
      data: PostCenterUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostUserResponse, void>({
        path: `/api/v1/users/center`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersCentersPartialUpdate
     * @summary Updates a center user.
     * @request PATCH:/api/v1/users/centers/{centerId}
     * @secure
     */
    v1UsersCentersPartialUpdate: (
      centerId: string,
      data: PatchCenterUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostUserResponse, void>({
        path: `/api/v1/users/centers/${centerId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The user is enabled in keycloak. The requesting user must have the role "center". The requesting user's ID must be the same as the centerId attribute in the target user.
     *
     * @tags Users
     * @name V1UsersActivateDetail
     * @summary Activates a user.
     * @request GET:/api/v1/users/{userId}/activate
     * @secure
     */
    v1UsersActivateDetail: (userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/users/${userId}/activate`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The user is disabled in keycloak. The requesting user must have the role "center". The requesting user's ID must be the same as the centerId attribute in the target user.
     *
     * @tags Users
     * @name V1UsersDeactivateDetail
     * @summary Deactivates a user.
     * @request GET:/api/v1/users/{userId}/deactivate
     * @secure
     */
    v1UsersDeactivateDetail: (userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/users/${userId}/deactivate`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The user's blocked attribute is set to "true". The requesting user must have the role "center". The requesting user's ID must be the same as the centerId attribute in the target user.
     *
     * @tags Users
     * @name V1UsersBlockDetail
     * @summary Blocks a user.
     * @request GET:/api/v1/users/{userId}/block
     * @secure
     */
    v1UsersBlockDetail: (userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/users/${userId}/block`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The user's blocked attribute is set to "false". The requesting user must have the role "center". The requesting user's ID must be the same as the centerId attribute in the target user.
     *
     * @tags Users
     * @name V1UsersUnblockDetail
     * @summary Unblocks a user.
     * @request GET:/api/v1/users/{userId}/unblock
     * @secure
     */
    v1UsersUnblockDetail: (userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/users/${userId}/unblock`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The user can update it's centerId attribute. The path value needs to be a valid center ID, otherwise the update cannot be fulfilled.
     *
     * @tags Users
     * @name V1UsersUserCenterPartialUpdate
     * @summary Updates the center ID of a user.
     * @request PATCH:/api/v1/users/user/center/{centerId}
     * @secure
     */
    v1UsersUserCenterPartialUpdate: (
      centerId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/users/user/center/${centerId}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The route will use the given code and verify the account in Keycloak.
     *
     * @tags Verification Codes
     * @name V1VerificationCodeVerifyAccountDetail
     * @summary Verifies the account by using the given code for confirmation.
     * @request GET:/api/v1/verification-code/verify-account/{code}
     * @secure
     */
    v1VerificationCodeVerifyAccountDetail: (
      code: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/verification-code/verify-account/${code}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The route will use the given email and relate it to a verification code.
     *
     * @tags Passwords
     * @name V1ResetPasswordRequestCreate
     * @summary Requests a password reset.
     * @request POST:/api/v1/reset-password/request
     * @secure
     */
    v1ResetPasswordRequestCreate: (
      data: PostRequestPasswordRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/reset-password/request`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The route will use the given new password and verification code to reset the password of an user.
     *
     * @tags Passwords
     * @name V1ResetPasswordVerifyCreate
     * @summary Resets a password.
     * @request POST:/api/v1/reset-password/verify/{verificationCode}
     * @secure
     */
    v1ResetPasswordVerifyCreate: (
      verificationCode: string,
      data: PostResetPasswordRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/reset-password/verify/${verificationCode}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The route can be used to (re)distribute the user data of a specific user to all of the relevant services (e.g. scheduling, messaging, prescription and notification). This route can only be used by admins.
     *
     * @tags Events
     * @name V1EventsUsersDistributeCreate
     * @summary Distributes the user data of a given user ID to all services.
     * @request POST:/api/v1/events/users/{userId}/distribute
     * @secure
     */
    v1EventsUsersDistributeCreate: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/events/users/${userId}/distribute`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description The route will automatically either create a new user avatar or update an existing one.
     *
     * @tags User Avatars
     * @name V1UserAvatarsCreate
     * @summary Upserts an user avatar.
     * @request POST:/api/v1/user-avatars
     * @secure
     */
    v1UserAvatarsCreate: (
      data: PostUserAvatarRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostUserAvatarResponse, void>({
        path: `/api/v1/user-avatars`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The route will automatically get the authenticated user's ID and delete the corresponding avatar.
     *
     * @tags User Avatars
     * @name V1UserAvatarsDelete
     * @summary Deletes an user avatar.
     * @request DELETE:/api/v1/user-avatars
     * @secure
     */
    v1UserAvatarsDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/user-avatars`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The route handles avatars as a public resource throughout the application, which means everyone can access avatars as long as the user is authenticated and has the role patient, professional or center.
     *
     * @tags User Avatars
     * @name V1UserAvatarsDetail
     * @summary Gets an user avatar by user ID.
     * @request GET:/api/v1/user-avatars/{userId}
     * @secure
     */
    v1UserAvatarsDetail: (userId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/v1/user-avatars/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
