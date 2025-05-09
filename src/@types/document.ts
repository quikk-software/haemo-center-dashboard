/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetDocumentResponse {
  id?: string;
  length?: number;
  chunkSize?: number;
  filename?: string;
  md5?: string;
  contentType?: string;
  uploadDate?: string;
  metadata?: {
    ownerUserId?: string;
    allowedUserIds?: string[];
  };
}

export interface ListDocumentsResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  files: GetDocumentResponse[];
}

export interface PostDocumentRequest {
  file: string;
  fileName: string;
  contentType: string;
  allowedUserIds: string[];
}

export interface PostDocumentRequestV2 {
  file: string;
  fileName: string;
  contentType: string;
  referenceId: string;
  type: string;
}

export interface PostDocumentResponse {
  id?: string;
  contentType?: string;
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
  public baseUrl: string = "http://localhost:3002/";
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
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
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
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
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
      const r = response.clone() as HttpResponse<T, E>;
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
 * @title Document Service
 * @version 0.1.0
 * @baseUrl http://localhost:3002/
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description The documents returned relate to the authorized user either because he is the owner or he is allowed to access the document.
     *
     * @tags Users
     * @name V1DocumentsList
     * @summary Gets all documents of the authorized user
     * @request GET:/api/v1/documents
     * @secure
     */
    v1DocumentsList: (
      query: {
        /** Number of users. */
        pageSize: number;
        /** Current page. */
        pageNumber: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListDocumentsResponse, void>({
        path: `/api/v1/documents`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The document will be saved with metadata like filename, content type and who is allowed to access the file.
     *
     * @tags Documents
     * @name V1DocumentsCreate
     * @summary Creates a new document
     * @request POST:/api/v1/documents
     * @secure
     */
    v1DocumentsCreate: (
      data: PostDocumentRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostDocumentResponse, void>({
        path: `/api/v1/documents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The document can only be accessed, if the authenticated user is either the owner or allowed to access the file.
     *
     * @tags Documents
     * @name V1DocumentsDetail
     * @summary Gets a document by ID.
     * @request GET:/api/v1/documents/{documentId}
     * @secure
     */
    v1DocumentsDetail: (documentId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/documents/${documentId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The document can only be accessed, if the authenticated user is an admin.
     *
     * @tags Admin
     * @name V1AdminDocumentsDetail
     * @summary Gets a document by ID.
     * @request GET:/api/v1/admin/documents/{documentId}
     * @secure
     */
    v1AdminDocumentsDetail: (documentId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/admin/documents/${documentId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The metadata can only be accessed, if the authenticated user is either the owner or allowed to access the file.
     *
     * @tags Documents
     * @name V1DocumentsMetadataList
     * @summary Gets the metadata of a document by ID.
     * @request GET:/api/v1/documents/{documentId}/metadata
     * @secure
     */
    v1DocumentsMetadataList: (documentId: string, params: RequestParams = {}) =>
      this.request<GetDocumentResponse, void>({
        path: `/api/v1/documents/${documentId}/metadata`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The metadata can only be accessed, if the authenticated user is an admin.
     *
     * @tags Admin
     * @name V1AdminDocumentsMetadataList
     * @summary Gets the metadata of a document by ID.
     * @request GET:/api/v1/admin/documents/{documentId}/metadata
     * @secure
     */
    v1AdminDocumentsMetadataList: (
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetDocumentResponse, void>({
        path: `/api/v1/admin/documents/${documentId}/metadata`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The document will be saved with metadata like filename, content type and who is allowed to access the file.
     *
     * @tags Documents
     * @name V2DocumentsCreate
     * @summary Creates a new document
     * @request POST:/api/v2/documents
     * @secure
     */
    v2DocumentsCreate: (
      data: PostDocumentRequestV2,
      params: RequestParams = {},
    ) =>
      this.request<PostDocumentResponse, void>({
        path: `/api/v2/documents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The document can only be accessed, if the authenticated user is either the owner or allowed to access the file.
     *
     * @tags Documents
     * @name V2DocumentsDetail
     * @summary Gets a document by ID.
     * @request GET:/api/v2/documents/{documentId}
     * @secure
     */
    v2DocumentsDetail: (documentId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v2/documents/${documentId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The metadata can only be accessed, if the authenticated user is either the owner or allowed to access the file.
     *
     * @tags Documents
     * @name V2DocumentsMetadataList
     * @summary Gets the metadata of a document by ID.
     * @request GET:/api/v2/documents/{documentId}/metadata
     * @secure
     */
    v2DocumentsMetadataList: (documentId: string, params: RequestParams = {}) =>
      this.request<GetDocumentResponse, void>({
        path: `/api/v2/documents/${documentId}/metadata`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
