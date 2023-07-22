import { getAccessTokenUsingRefreshToken, isTokenExpired } from "./auth.utils";
import type { AnyAction, Dispatch } from "redux";
import { setAccessToken, setRefreshToken } from "../components/auth/authSlice";

const getApi = async (
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch<AnyAction>,
) => {
  if (accessToken === null || refreshToken === null) {
    return {};
  }
  const headers: any = {};
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

export { getApi };
