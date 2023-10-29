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

export interface GetNewsResponse {
  id?: number;
  creatorId?: string;
  image?: string;
  imageMIMEType?: string;
  headline?: string;
  text?: string;
  creatorName?: string;
  link?: string;
  isSponsored?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostNewsRequest {
  image?: string;
  imageMIMEType?: string;
  headline?: string;
  text?: string;
  creatorName?: string;
  link?: string;
}

export interface PostNewsResponse {
  newsId?: number;
}

export interface ListNewsResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  news: GetNewsResponse[];
  totalPages?: number;
}

export interface PatchNewsRequest {
  newsId: number;
  image?: string;
  imageMIMEType?: string;
  headline?: string;
  text?: string;
  creatorName?: string;
  link?: string;
}

export interface PatchIsAdminNewsRequest {
  newsId: number;
  IsAdmin: boolean;
}

export interface PatchIsSponsoredNewsRequest {
  newsId: number;
  IsSponsored: boolean;
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
  public baseUrl: string = "";
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
 * @title Feed Service
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Every logged in user can query every news object
     *
     * @tags News
     * @name V1NewsDetail
     * @summary Gets a news object by its ID.
     * @request GET:/api/v1/news/{id}
     * @secure
     */
    v1NewsDetail: (id: number, params: RequestParams = {}) =>
      this.request<GetNewsResponse, void>({
        path: `/api/v1/news/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Requieres the requesting user to be the center which created the news, else an Unauthorized-Exception is thrown
     *
     * @tags News
     * @name V1NewsDelete
     * @summary Deletes a news object by its ID.
     * @request DELETE:/api/v1/news/{id}
     * @secure
     */
    v1NewsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/news/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a center, else an Unauthorized-Exception will be thrown.
     *
     * @tags News
     * @name V1NewsCreate
     * @summary Creates a new news object.
     * @request POST:/api/v1/news
     * @secure
     */
    v1NewsCreate: (data: PostNewsRequest, params: RequestParams = {}) =>
      this.request<PostNewsResponse, void>({
        path: `/api/v1/news`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Lists all news. Every logged in user can query all news. This returns news by admins first, followed by sponsored news and finally all other news. News are also sorted by creation time with the newest news first.
     *
     * @tags News
     * @name V1NewsList
     * @summary Lists all news
     * @request GET:/api/v1/news
     * @secure
     */
    v1NewsList: (
      query?: {
        /** the page to get */
        pageNumber?: number;
        /** how many news item to return on a page */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListNewsResponse, void>({
        path: `/api/v1/news`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be the center which created the news.
     *
     * @tags News
     * @name V1NewsPartialUpdate
     * @summary Updates an existing news object.
     * @request PATCH:/api/v1/news
     * @secure
     */
    v1NewsPartialUpdate: (data: PatchNewsRequest, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/news`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The requesting user must be an admin.
     *
     * @tags News
     * @name V1NewsIsAdminPartialUpdate
     * @summary Updates the isAdmin flag of a news object.
     * @request PATCH:/api/v1/news/isAdmin
     * @secure
     */
    v1NewsIsAdminPartialUpdate: (
      data: PatchIsAdminNewsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/news/isAdmin`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The requesting user must be an admin.
     *
     * @tags News
     * @name V1NewsIsSponsoredPartialUpdate
     * @summary Updates the isSponsored flag of a news object.
     * @request PATCH:/api/v1/news/isSponsored
     * @secure
     */
    v1NewsIsSponsoredPartialUpdate: (
      data: PatchIsSponsoredNewsRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/news/isSponsored`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
