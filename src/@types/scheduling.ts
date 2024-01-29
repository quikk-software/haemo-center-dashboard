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

export interface GetMeetingResponse {
  id?: number;
  timeFrameId?: number;
  doctorUserId?: number;
  patientUserId?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  state?: string;
}

export interface PostMeetingRequest {
  timeFrameId: number;
  date: string;
  startTime: string;
  endTime: string;
  state: string;
}

export interface PostMeetingResponse {
  id?: number;
}

export interface ListMeetingRequest {
  timeFrameId?: number;
  date?: string;
  pageSize: number;
  pageNumber: number;
}

export interface ListMeetingResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  meetings: GetMeetingResponse[];
}

export interface PatchMeetingRequest {
  id: number;
  patientUserId?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  state?: string;
}

export interface ListPatientMeetingRequest {
  userId: number;
}

export interface ListPatientMeetingResponse {
  meetings: GetMeetingResponse[];
}

export interface ListProfessionalMeetingRequest {
  userId: number;
}

export interface ListProfessionalMeetingResponse {
  meetings: GetMeetingResponse[];
}

export interface GetSchedulingUserResponse {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  userId?: string;
  roles: string[];
}

export interface PostSchedulingUserRequest {
  firstName: string;
  lastName: string;
  birthday: string;
}

export interface PostSchedulingUserResponse {
  id?: number;
}

export interface ListSchedulingUsersResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  schedulingUsers: GetSchedulingUserResponse[];
}

export interface PatchSchedulingUserRequest {
  schedulingUserId: number;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  roles?: boolean;
}

export interface GetTimeFrameResponse {
  id?: number;
  userId?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  meetingDuration?: number;
  daysOfWeek?: number[];
}

export interface PostTimeFrameRequest {
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  meetingDuration: number;
  daysOfWeek: number[];
}

export interface PostTimeFrameResponse {
  id?: number;
}

export interface ListTimeFramesRequest {
  userId?: number;
}

export interface ListTimeFramesResponse {
  count?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  timeFrames: GetTimeFrameResponse[];
}

export interface PatchTimeFrameRequest {
  id: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  meetingDuration?: number;
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
 * @title Scheduling Service
 * @version 0.1.0
 * @baseUrl http://localhost:3002/
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description A center can delete meetings of its professionals with this route by providing a meeting ID and the ID of the professional related to this meeting.
     *
     * @tags Meetings
     * @name V1MeetingCenterDelete
     * @summary Deletes a meeting by its ID by a center.
     * @request DELETE:/api/v1/meeting/{meetingId}/center
     * @secure
     */
    v1MeetingCenterDelete: (meetingId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/meeting/${meetingId}/center`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must either be the owner of the meeting or the patient, else an Unauthorized-Exception will be thrown
     *
     * @tags Meetings
     * @name V1MeetingDetail
     * @summary Gets a meeting by its ID.
     * @request GET:/api/v1/meeting/{id}
     * @secure
     */
    v1MeetingDetail: (id: number, params: RequestParams = {}) =>
      this.request<GetMeetingResponse, void>({
        path: `/api/v1/meeting/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Requieres the requesting user to be the owner of the meeting, else an Unauthorized-Exception is thrown
     *
     * @tags Meetings
     * @name V1MeetingDelete
     * @summary Deletes a meeting by its ID.
     * @request DELETE:/api/v1/meeting/{id}
     * @secure
     */
    v1MeetingDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/meeting/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a center and the given user ID a valid scheduling user.
     *
     * @tags Meetings
     * @name V1MeetingTakenDetail
     * @summary Gets all taken meetings of a professional.
     * @request GET:/api/v1/meeting/{schedulingUserId}/taken
     * @secure
     */
    v1MeetingTakenDetail: (
      schedulingUserId?: number,
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListMeetingResponse, void>({
        path: `/api/v1/meeting/${schedulingUserId}/taken`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be the owner of the timeFrame, the meeting belongs to, else an Unauthorized-Exception will be thrown.
     *
     * @tags Meetings
     * @name V1MeetingCreate
     * @summary Creates a new meeting.
     * @request POST:/api/v1/meeting
     * @secure
     */
    v1MeetingCreate: (data: PostMeetingRequest, params: RequestParams = {}) =>
      this.request<PostMeetingResponse, void>({
        path: `/api/v1/meeting`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Needs one of the following arguments: timeFrameId or date. The requesting user must be a professional. If requesting all meetings for a timeFrame, he must be the owner of the timeFrame, else an Unauthorized-Exception will be thrown. If requesting all meetings for a date, only the meetings belonging to the requesting user will be returned.
     *
     * @tags Meetings
     * @name V1MeetingList
     * @summary Lists all meetings of either a date or a timeFrame
     * @request GET:/api/v1/meeting
     * @secure
     */
    v1MeetingList: (
      query?: {
        /** ID of the time frame to get meetings from. */
        timeFrameId?: number;
        /** Date to get meetings from. */
        date?: string;
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListMeetingResponse, void>({
        path: `/api/v1/meeting`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be the owner of the meeting, else an Unauthorized-Exception will be thrown. Canot update the id, timeFrameId or which professional the meetings belongs to. In that case, delete the meeting and create a new one.
     *
     * @tags Meetings
     * @name V1MeetingPartialUpdate
     * @summary Updates an existing meeting.
     * @request PATCH:/api/v1/meeting
     * @secure
     */
    v1MeetingPartialUpdate: (
      data: PatchMeetingRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/meeting`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The requesting user must be the owner of the meeting, else an Unauthorized-Exception will be thrown.
     *
     * @tags Meetings
     * @name V1MeetingAcceptPartialUpdate
     * @summary Accepts a meeting.
     * @request PATCH:/api/v1/meeting/accept/{id}
     * @secure
     */
    v1MeetingAcceptPartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/meeting/accept/${id}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a center related to the professional of the meeting.
     *
     * @tags Meetings
     * @name V1MeetingAcceptCenterPartialUpdate
     * @summary Accepts a meeting by a center user.
     * @request PATCH:/api/v1/meeting/accept/{id}/center
     * @secure
     */
    v1MeetingAcceptCenterPartialUpdate: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/meeting/accept/${id}/center`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be the owner of the meeting, else an Unauthorized-Exception will be thrown.
     *
     * @tags Meetings
     * @name V1MeetingRejectPartialUpdate
     * @summary Rejects a meeting.
     * @request PATCH:/api/v1/meeting/reject/{id}
     * @secure
     */
    v1MeetingRejectPartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/meeting/reject/${id}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a center related to the professional of the meeting.
     *
     * @tags Meetings
     * @name V1MeetingRejectCenterPartialUpdate
     * @summary Rejects a meeting by a center user.
     * @request PATCH:/api/v1/meeting/reject/{id}/center
     * @secure
     */
    v1MeetingRejectCenterPartialUpdate: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/meeting/reject/${id}/center`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a patient and related to the meeting, else an Unauthorized-Exception will be thrown.
     *
     * @tags Meetings
     * @name V1MeetingDeclinePartialUpdate
     * @summary Declines a meeting.
     * @request PATCH:/api/v1/meeting/decline/{id}
     * @secure
     */
    v1MeetingDeclinePartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/meeting/decline/${id}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The requesting user must be a patient, else an Unauthorized-Exception will be thrown. If the meeting is already requested or accepted, a forbidden exception will be raised.
     *
     * @tags Meetings
     * @name V1MeetingRequestPartialUpdate
     * @summary Requests a meeting.
     * @request PATCH:/api/v1/meeting/request/{id}
     * @secure
     */
    v1MeetingRequestPartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/meeting/request/${id}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description The requested user must be a patient. There are 3 cases possible: 1. A patient queries another patient -> Forbidden 2. A patient queries himself -> returns all meetings, where he is the patient 3. A professional queries a patient -> returns all meetings between the professional and the patient.
     *
     * @tags Meetings
     * @name V1PatientMeetingDetail
     * @summary Lists all meetings of a patient
     * @request GET:/api/v1/patient_meeting/{id}
     * @secure
     */
    v1PatientMeetingDetail: (id: number, params: RequestParams = {}) =>
      this.request<ListPatientMeetingResponse, void>({
        path: `/api/v1/patient_meeting/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requested user must be a professional. There are 3 cases possible: 1. A professional queries another professional -> Forbidden 2. A professional queries himself -> returns all meetings, where he is the professional (taken and free ones) 3. A patient queries a professional -> returns all free meetings of the professional.
     *
     * @tags Meetings
     * @name V1ProfessionalMeetingDetail
     * @summary Lists all meetings of a professional
     * @request GET:/api/v1/professional_meeting/{id}
     * @secure
     */
    v1ProfessionalMeetingDetail: (
      id: number,
      query?: {
        /** State of the meetings to get from a professional. */
        state?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListProfessionalMeetingResponse, void>({
        path: `/api/v1/professional_meeting/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requested user must be a center or admin. The center user must be related to the target user.
     *
     * @tags Meetings
     * @name V1MeetingsUserDetail
     * @summary Lists all meetings of an user.
     * @request GET:/api/v1/meetings/user/{userId}
     * @secure
     */
    v1MeetingsUserDetail: (
      userId: string,
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListProfessionalMeetingResponse, void>({
        path: `/api/v1/meetings/user/${userId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a professional or the schedulingUser himself, else an Unauthorized-Exception will be thrown
     *
     * @tags Scheduling User
     * @name V1SchedulingUsersUserDetail
     * @summary Get a schedulingUsers by the related user ID
     * @request GET:/api/v1/schedulingUsers/user/{id}
     * @secure
     */
    v1SchedulingUsersUserDetail: (id: string, params: RequestParams = {}) =>
      this.request<GetSchedulingUserResponse, void>({
        path: `/api/v1/schedulingUsers/user/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with center or admin role are allowed to fetch the scheduling user.
     *
     * @name V1SchedulingUsersCenterDetail
     * @summary Gets a scheduling user by ID.
     * @request GET:/api/v1/schedulingUsers/center/{schedulingUserId}
     * @secure
     */
    v1SchedulingUsersCenterDetail: (
      schedulingUserId: number,
      params: RequestParams = {},
    ) =>
      this.request<GetSchedulingUserResponse, void>({
        path: `/api/v1/schedulingUsers/center/${schedulingUserId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Users with center or admin role are allowed to fetch the scheduling user.
     *
     * @name V1SchedulingUsersCenterUsersDetail
     * @summary Gets a scheduling user by user ID.
     * @request GET:/api/v1/schedulingUsers/center/users/{userId}
     * @secure
     */
    v1SchedulingUsersCenterUsersDetail: (
      userId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetSchedulingUserResponse, void>({
        path: `/api/v1/schedulingUsers/center/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a professional or the schedulingUser himself, else an Unauthorized-Exception will be thrown
     *
     * @tags Scheduling User
     * @name V1SchedulingUsersDetail
     * @summary Get a schedulingUsers by its ID
     * @request GET:/api/v1/schedulingUsers/{id}
     * @secure
     */
    v1SchedulingUsersDetail: (id: number, params: RequestParams = {}) =>
      this.request<GetSchedulingUserResponse, void>({
        path: `/api/v1/schedulingUsers/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scheduling User
     * @name V1ProfessionalsSchedulingUsersList
     * @summary Gets professional scheduling users by a given center ID.
     * @request GET:/api/v1/professionals/schedulingUsers
     * @secure
     */
    v1ProfessionalsSchedulingUsersList: (
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListSchedulingUsersResponse, void>({
        path: `/api/v1/professionals/schedulingUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Scheduling User
     * @name V1SchedulingUsersCreate
     * @summary Creates a new schedulingUser.
     * @request POST:/api/v1/schedulingUsers
     * @secure
     */
    v1SchedulingUsersCreate: (
      data: PostSchedulingUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostSchedulingUserResponse, void>({
        path: `/api/v1/schedulingUsers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a professional, else an Unauthorized-Exception will be thrown
     *
     * @tags Scheduling User
     * @name V1SchedulingUsersList
     * @summary Lists all schedulingUsers
     * @request GET:/api/v1/schedulingUsers
     * @secure
     */
    v1SchedulingUsersList: (
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListSchedulingUsersResponse, void>({
        path: `/api/v1/schedulingUsers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Canot update the id and userId. In that case, delete the schedulingUser and create a new one. The update-api does not directly accept roles. Instead, if the "roles" parameter is true, it fetches the roles from the keycloak token and updates them. If the roles are changed in keycloak, you have to request a new token in order for this API to see the changes.
     *
     * @tags Scheduling User
     * @name V1SchedulingUsersPartialUpdate
     * @summary Updates an existing schedulingUser.
     * @request PATCH:/api/v1/schedulingUsers
     * @secure
     */
    v1SchedulingUsersPartialUpdate: (
      data: PatchSchedulingUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/schedulingUsers`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description The requesting user must be the owner of the timeFrame, else an Unauthorized-Exception will be thrown
     *
     * @tags TimeFrame
     * @name V1TimeFrameDetail
     * @summary Gets a timeFrame by its ID.
     * @request GET:/api/v1/timeFrame/{id}
     * @secure
     */
    v1TimeFrameDetail: (id: number, params: RequestParams = {}) =>
      this.request<GetTimeFrameResponse, void>({
        path: `/api/v1/timeFrame/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Requieres the requesting user to be the owner of the timeFrame, else an Unauthorized-Exception is thrown. If a TimeFrame is deleted, all empty meetings (no patient assigned) in the TimeFrame also get deleted.
     *
     * @tags TimeFrame
     * @name V1TimeFrameDelete
     * @summary Deletes a timeFrame by its ID.
     * @request DELETE:/api/v1/timeFrame/{id}
     * @secure
     */
    v1TimeFrameDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/timeFrame/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description TimeFrames can only be created by professionals. If a TimeFrame is created, the corresponding meetings in the TimeFrame are also created. A TimeFrame canot be longer than 6 months.
     *
     * @tags TimeFrame
     * @name V1TimeFrameCreate
     * @summary Creates a new timeFrame.
     * @request POST:/api/v1/timeFrame
     * @secure
     */
    v1TimeFrameCreate: (
      data: PostTimeFrameRequest,
      params: RequestParams = {},
    ) =>
      this.request<PostTimeFrameResponse, void>({
        path: `/api/v1/timeFrame`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description The requesting user must be a professional, else an Unauthorized-Exception will be thrown
     *
     * @tags TimeFrame
     * @name V1TimeFrameList
     * @summary Lists all timeFrames
     * @request GET:/api/v1/timeFrame
     * @secure
     */
    v1TimeFrameList: (
      query?: {
        /** The current page number. */
        pageNumber?: number;
        /** The page size. */
        pageSize?: number;
      },
      data?: ListTimeFramesRequest,
      params: RequestParams = {},
    ) =>
      this.request<ListTimeFramesResponse, void>({
        path: `/api/v1/timeFrame`,
        method: "GET",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Canot update the id and userId. In that case, delete the timeFrame and create a new one.
     *
     * @tags TimeFrame
     * @name V1TimeFramePartialUpdate
     * @summary Updates an existing timeFrame.
     * @request PATCH:/api/v1/timeFrame
     * @secure
     */
    v1TimeFramePartialUpdate: (
      data: PatchTimeFrameRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/v1/timeFrame`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
