import jwtDecode from "jwt-decode";
import axios from "axios";
import qs from "qs";
import logger from "@/core/logger";
import { getLoginURL } from "@/api/urls";

/**
 * Function returns the user ID inside of an access token.
 * @param accessToken
 */
const getUserIdFromAccessToken = (accessToken: string) => {
  const decoded: any = jwtDecode(accessToken);
  return decoded.sub ?? "";
};

/**
 * Function checks, if a token is expired
 * @param token
 */
const isTokenExpired = (token: string) => {
  const decoded: any = jwtDecode(token);

  if (decoded.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
};

/**
 * Function returns an access token based on a given refresh token.
 * @param refreshToken
 */
const getAccessTokenUsingRefreshToken = async (refreshToken: string) => {
  if (refreshToken !== "") {
    try {
      return await axios.post(
        getLoginURL(),
        qs.stringify({
          grant_type: "refresh_token",
          client_id: "haemo",
          refresh_token: refreshToken,
        }),
      );
    } catch (err) {
      logger.error({ err });
      return undefined;
    }
  }
  return undefined;
};

const isTokenValid = (accessToken: string | null) =>
  accessToken !== null && accessToken !== "" && !isTokenExpired(accessToken);

export {
  getUserIdFromAccessToken,
  getAccessTokenUsingRefreshToken,
  isTokenExpired,
  isTokenValid,
};
