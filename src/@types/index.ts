import { Api as UserApi } from "./user";
import { Api as FeedApi } from "./feed";
import { Api as PrescriptionApi } from "./prescription";
import { Api as SchedulingApi } from "./scheduling";
import {
  getAccessTokenUsingRefreshToken,
  isTokenExpired,
} from "../auth/auth.utils";
import type { AnyAction, Dispatch } from "redux";
import { setAccessToken, setRefreshToken } from "../components/auth/authSlice";
import Api from "@/config";

const userApi = new UserApi({
  baseUrl: Api.USER_API,
});

const feedApi = new FeedApi({
  baseUrl: Api.FEED_API,
});

const prescriptionApi = new PrescriptionApi({
  baseUrl: Api.PRESCRIPTION_API,
});

const schedulingApi = new SchedulingApi({ baseUrl: Api.SCHEDULING_API });

const getApi = async (
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch<AnyAction>,
) => {
  if (accessToken === null || refreshToken === null) {
    return {
      headers: undefined,
    };
  }
  const headers: Record<any, any> = {
    headers: undefined,
  };
  if (accessToken !== "") {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const params = { headers };
  if (isTokenExpired(accessToken)) {
    const res = await getAccessTokenUsingRefreshToken(refreshToken);
    if (
      res?.data !== undefined &&
      "access_token" in res.data &&
      "refresh_token" in res.data
    ) {
      const newAccessToken: string = (res.data.access_token as string) ?? "";
      const newRefreshToken: string = (res.data.refresh_token as string) ?? "";
      params.headers.Authorization = `Bearer ${newAccessToken}`;
      dispatch(setAccessToken(newAccessToken));
      dispatch(setRefreshToken(newRefreshToken));
    }
  }
  return params;
};

export { userApi, feedApi, prescriptionApi, schedulingApi, getApi };
