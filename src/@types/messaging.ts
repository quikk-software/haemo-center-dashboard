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

export interface PostChatRequest {
  initiatorUserId?: string;
  otherUserId?: string;
}

export interface PostChatRequestV2 {
  isCenterChat?: boolean;
  otherUserIds: string[];
}

export interface PostChatMessageRequest {
  fileIds: DocumentObject[];
  message?: string;
  chatId?: string;
  fromUserId?: string;
}

export interface PostEmergencyChatMessageRequest {
  message?: string;
  chatId?: string;
  fromUserId?: string;
  latitude?: string;
  longitude?: string;
}

export interface UpdateChatMessageRequest {
  id?: string;
  fileIds: DocumentObject[];
  message?: string;
  chatId?: string;
  fromUserId?: string;
}

export interface PostChatResponse {
  chatId?: string;
}

export interface PostChatMessageResponse {
  id?: string;
  message?: string;
  isRead?: boolean;
  fileIds: DocumentObject[];
  fromUserId?: string;
  chatId?: string;
  readTime?: string;
  chatMessageCreatedAt?: string;
  chatMessageUpdatedAt?: string;
}

export interface PostChatMessageResponseV2 {
  id?: string;
  message?: string;
  isRead?: boolean;
  fileIds: DocumentObject[];
  fromUserId?: string;
  chatId?: string;
  readBy?: GetChatMessageReadResponse;
  chatMessageCreatedAt?: string;
  chatMessageUpdatedAt?: string;
}

export type GetChatMessageReadResponse = {
  id?: string;
  userId?: string;
  chatMessageId?: string;
  readTime?: string;
  chatId?: string;
}[];

export interface GetChatMessageResponse {
  id?: string;
  message?: string;
  isRead?: boolean;
  fileIds: DocumentObject[];
  fromUserId?: string;
  chatId?: string;
  readTime?: string;
  chatMessageCreatedAt?: string;
  chatMessageUpdatedAt?: string;
}

export interface GetChatMessageResponseV2 {
  id?: string;
  message?: string;
  fileIds: DocumentObject[];
  fromUserId?: string;
  chatId?: string;
  readTime?: string;
  readBy?: GetChatMessageReadResponse;
  chatMessageCreatedAt?: string;
  chatMessageUpdatedAt?: string;
}

export interface GetChatUserChatResponse {
  id?: string;
  chatUserId?: string;
  chatId?: string;
}

export interface GetChatResponse {
  id?: string;
  chatCreatedAt?: string;
  chatUpdatedAt?: string;
  chatMessages: GetChatMessageResponse[];
  correspondingFirstName?: string;
  correspondingLastName?: string;
  correspondingAlias?: string;
  correspondingUserId?: string;
  correspondingRole?: string;
  correspondingCenterId?: string;
  correspondingIsInitiator?: boolean;
  isAccepted?: boolean;
  unreadMessages?: number;
  isBlocked?: boolean;
  v?: number;
}

export interface GetChatResponseV2 {
  id?: string;
  chatCreatedAt?: string;
  chatUpdatedAt?: string;
  chatMessages: GetChatMessageResponseV2[];
  chatUsers: GetChatUserResponse[];
  initiatorUserId: string;
  isAccepted: boolean;
  isCenterChat: boolean;
  unreadMessages: number;
  v?: number;
}

export interface GetChatCounterResponse {
  id?: string;
  chatId?: string;
  count?: number;
  chatCounterCreatedAt?: string;
  chatCounterUpdatedAt?: string;
}

export interface GetChatUserResponse {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  alias?: string;
  phoneNumber?: string;
  role?: string;
  centerId?: string;
  isDeleted?: boolean;
  chatUserCreatedAt?: string;
  chatUserUpdatedAt?: string;
}

export interface ListChatUsersResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  chatUsers: GetChatUserResponse[];
}

export interface ListChatsResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  chats: GetChatResponse[];
}

export interface ListChatsResponseV2 {
  count?: number;
  chats: GetChatResponseV2[];
}

export interface ListChatMessagesResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  chatMessages: GetChatMessageResponse[];
}

export interface ListChatMessagesResponseV2 {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  chatMessages: GetChatMessageResponseV2[];
}

export interface DocumentObject {
  id?: string;
  type?: string;
}

export interface PutEmergencyChatUserRequest {
  emergencyUserId?: string;
}

export interface PutEmergencyChatUserResponse {
  emergencyChatUserId?: string;
}

export interface GetEmergencyChatUserResponse {
  id?: string;
  emergencyChatUserId?: string;
  ownerChatUserId?: string;
  emergencyUserId?: string;
  ownerUserId?: string;
  chatId?: string;
  emergencyChatUserFirstName?: string;
  emergencyChatUserLastName?: string;
  emergencyChatUserCenterId?: string;
  emergencyChatUserCreatedAt?: string;
  emergencyChatUserUpdatedAt?: string;
}

export interface GetDisclaimerTrackerResponse {
  id: number;
  /** @example "SPONSORING" */
  type: string;
  userId: string;
}

export interface PostDisclaimerTrackerRequest {
  /** @example "SPONSORING" */
  type: string;
}

export interface PostDisclaimerTrackerResponse {
  disclaimerTrackerId: string;
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
  public baseUrl: string = "http://localhost:3003/";
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
 * @title Messaging Service
 * @version 0.1.0
 * @baseUrl http://localhost:3003/
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Chats
     * @name V1ChatsCreate
     * @summary Creates a new chat.
     * @request POST:/api/v1/chats
     * @secure
     */
    v1ChatsCreate: (data: PostChatRequest, params: RequestParams = {}) =>
      this.request<PostChatResponse, void>({
        path: `/api/v1/chats`,
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
     * @tags Chats
     * @name V1ChatsList
     * @summary Gets all chats.
     * @request GET:/api/v1/chats
     * @secure
     */
    v1ChatsList: (
      query: {
        /** ID of the chat user. */
        userId: string;
        /** Number of chat messages to get for the given chat. */
        pageSize: number;
        /** Current page related to fetching chat messages. */
        pageNumber: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListChatsResponse, any>({
        path: `/api/v1/chats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats
     * @name V1ChatsDetail
     * @summary Gets a chat by ID.
     * @request GET:/api/v1/chats/{chatId}
     * @secure
     */
    v1ChatsDetail: (
      chatId: string,
      query: {
        /** Number of chat messages to get for the given chat. */
        numberOfMessages: number;
        /** Current page related to fetching chat messages. */
        pageNumber: number;
        /** The last message count in order to prevent fetching chat messages, which are already on the user's phone. */
        lastMessageCount: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetChatResponse, void>({
        path: `/api/v1/chats/${chatId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats
     * @name V1ChatsAcceptDetail
     * @summary Accepts a chat by ID.
     * @request GET:/api/v1/chats/accept/{chatId}
     * @secure
     */
    v1ChatsAcceptDetail: (chatId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chats/accept/${chatId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats
     * @name V1ChatsDeclineDetail
     * @summary Declines a chat by ID.
     * @request GET:/api/v1/chats/decline/{chatId}
     * @secure
     */
    v1ChatsDeclineDetail: (chatId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chats/decline/${chatId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Messages
     * @name V1ChatMessagesCreate
     * @summary Creates a new chat message.
     * @request POST:/api/v1/chatMessages
     * @secure
     */
    v1ChatMessagesCreate: (
      data: PostChatMessageRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostChatMessageResponse, void>({
        path: `/api/v1/chatMessages`,
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
     * @tags Chat Messages
     * @name V1ChatMessagesPartialUpdate
     * @summary Updates an existing chat message
     * @request PATCH:/api/v1/chatMessages
     * @secure
     */
    v1ChatMessagesPartialUpdate: (
      data: UpdateChatMessageRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/chatMessages`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Messages
     * @name V1ChatMessagesList
     * @summary Gets all chat messages
     * @request GET:/api/v1/chatMessages
     * @secure
     */
    v1ChatMessagesList: (
      query: {
        /** ID of the chat to get. */
        chatId: string;
        /** Number of chat messages to get for the given chat. */
        pageSize: number;
        /** Current page related to fetching chat messages. */
        pageNumber: number;
        /** The last message count in order to prevent fetching chat messages, which are already on the user's phone. */
        lastMessageCount: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListChatMessagesResponse, void>({
        path: `/api/v1/chatMessages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats
     * @name V2ChatsCreate
     * @summary Creates a new chat.
     * @request POST:/api/v2/chats
     * @secure
     */
    v2ChatsCreate: (data: PostChatRequestV2, params: RequestParams = {}) =>
      this.request<PostChatResponse, any>({
        path: `/api/v2/chats`,
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
     * @tags Chats
     * @name V2ChatsList
     * @summary Gets all chats.
     * @request GET:/api/v2/chats
     * @secure
     */
    v2ChatsList: (
      query: {
        /** ID of the chat user. */
        userId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListChatsResponseV2, any>({
        path: `/api/v2/chats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Messages
     * @name V2ChatMessagesCreate
     * @summary Creates a new chat message.
     * @request POST:/api/v2/chatMessages
     * @secure
     */
    v2ChatMessagesCreate: (
      data: PostChatMessageRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostChatMessageResponseV2, any>({
        path: `/api/v2/chatMessages`,
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
     * @tags Chat Messages
     * @name V2ChatMessagesList
     * @summary Gets all chat messages
     * @request GET:/api/v2/chatMessages
     * @secure
     */
    v2ChatMessagesList: (
      query: {
        /** ID of the chat to get. */
        chatId: string;
        /** Number of chat messages to get for the given chat. */
        pageSize: number;
        /** Current page related to fetching chat messages. */
        pageNumber: number;
        /** The last message count in order to prevent fetching chat messages, which are already on the user's phone. */
        lastMessageCount: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListChatMessagesResponseV2, any>({
        path: `/api/v2/chatMessages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This route creates a new emergency chat message. This will be displayed as a normal chat message, but will also trigger the notification service to not only send a push notification, but also an email.
     *
     * @tags Chat Messages
     * @name V1ChatMessagesEmergencyCreate
     * @summary Creates a new emergency chat message.
     * @request POST:/api/v1/chatMessages/emergency
     * @secure
     */
    v1ChatMessagesEmergencyCreate: (
      data: PostEmergencyChatMessageRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostChatMessageResponse, void>({
        path: `/api/v1/chatMessages/emergency`,
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
     * @tags Chat Messages
     * @name V1ChatMessagesDetail
     * @summary Gets a chat message by its ID.
     * @request GET:/api/v1/chatMessages/{id}
     * @secure
     */
    v1ChatMessagesDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetChatMessageResponse, void>({
        path: `/api/v1/chatMessages/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description File references can only be removed by admin users.
     *
     * @tags Chat Messages
     * @name V1ChatMessagesRemoveFilesDelete
     * @summary Deletes all file references of a chat message by its ID.
     * @request DELETE:/api/v1/chatMessages/{id}/remove-files
     * @secure
     */
    v1ChatMessagesRemoveFilesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chatMessages/${id}/remove-files`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Messages
     * @name V1ChatMessagesIsReadList
     * @summary Sets the isRead flag of a chat message by its ID.
     * @request GET:/api/v1/chatMessages/{id}/isRead
     * @secure
     */
    v1ChatMessagesIsReadList: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chatMessages/${id}/isRead`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Messages
     * @name V2ChatMessagesIsReadList
     * @summary Sets the isRead flag of a chat message by its ID.
     * @request GET:/api/v2/chatMessages/{id}/isRead
     * @secure
     */
    v2ChatMessagesIsReadList: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v2/chatMessages/${id}/isRead`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Messages
     * @name V1ChatMessagesChatIsReadList
     * @summary Sets the isRead flag of all messages coming from the corresponding user related to a chat.
     * @request GET:/api/v1/chatMessages/chat/{id}/isRead
     * @secure
     */
    v1ChatMessagesChatIsReadList: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chatMessages/chat/${id}/isRead`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Users
     * @name V1ChatUsersDetail
     * @summary Gets a user by an user ID.
     * @request GET:/api/v1/chatUsers/{id}
     * @secure
     */
    v1ChatUsersDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetChatUserResponse, void>({
        path: `/api/v1/chatUsers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Users
     * @name V1ProfessionalsChatUsersList
     * @summary Lists professional chat users.
     * @request GET:/api/v1/professionals/chatUsers
     * @secure
     */
    v1ProfessionalsChatUsersList: (
      query: {
        /** Number of chat users to get. */
        pageSize: number;
        /** Current page related to fetching chat users. */
        pageNumber: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListChatUsersResponse, void>({
        path: `/api/v1/professionals/chatUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Users
     * @name V1ChatUsersAliasDetail
     * @summary Gets a user by providing the alias.
     * @request GET:/api/v1/chatUsers/alias/{alias}
     * @secure
     */
    v1ChatUsersAliasDetail: (alias: string, params: RequestParams = {}) =>
      this.request<GetChatUserResponse, void>({
        path: `/api/v1/chatUsers/alias/${alias}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Users
     * @name V1ChatUsersBlockList
     * @summary Blocks a user by user ID.
     * @request GET:/api/v1/chatUsers/{id}/block
     * @secure
     */
    v1ChatUsersBlockList: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chatUsers/${id}/block`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chat Users
     * @name V1ChatUsersUnblockList
     * @summary Unblocks a user by user ID.
     * @request GET:/api/v1/chatUsers/{id}/unblock
     * @secure
     */
    v1ChatUsersUnblockList: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/chatUsers/${id}/unblock`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description The emergency contact will be automatically returned based on the user ID of the authenticated user. If there is no emergency user, a Not Found Exception will be thrown.
     *
     * @tags Emergency Chat Users
     * @name V1EmergencyChatUsersList
     * @summary Gets the emergency chat user of the authenticated user.
     * @request GET:/api/v1/emergencyChatUsers
     * @secure
     */
    v1EmergencyChatUsersList: (params: RequestParams = {}) =>
      this.request<GetEmergencyChatUserResponse, void>({
        path: `/api/v1/emergencyChatUsers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The emergency contact will be determined by the given user ID. The emergency contact can only be updated, multiple are not possible.
     *
     * @tags Emergency Chat Users
     * @name V1EmergencyChatUsersUpdate
     * @summary Upserts an emergency contact.
     * @request PUT:/api/v1/emergencyChatUsers
     * @secure
     */
    v1EmergencyChatUsersUpdate: (
      data: PutEmergencyChatUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<PutEmergencyChatUserResponse, void>({
        path: `/api/v1/emergencyChatUsers`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be the owner of a disclaimer tracker, else an Not Found Exception will be thrown
     *
     * @tags Disclaimers
     * @name V1DisclaimersList
     * @summary Gets the disclaimer tracker of the authenticated user
     * @request GET:/api/v1/disclaimers
     * @secure
     */
    v1DisclaimersList: (params: RequestParams = {}) =>
      this.request<GetDisclaimerTrackerResponse, void>({
        path: `/api/v1/disclaimers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user will be added as the owner of the disclaimer tracker.
     *
     * @tags Disclaimers
     * @name V1DisclaimersCreate
     * @summary Creates a new disclaimer tracker.
     * @request POST:/api/v1/disclaimers
     * @secure
     */
    v1DisclaimersCreate: (
      data: PostDisclaimerTrackerRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostDisclaimerTrackerResponse, void>({
        path: `/api/v1/disclaimers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
