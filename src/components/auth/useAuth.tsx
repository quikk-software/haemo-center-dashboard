import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import qs from "qs";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getUserIdFromAccessToken } from "@/auth/auth.utils";
import {
  setAccessToken,
  setCenterId,
  setRefreshToken,
  setRoles,
  setUserId,
} from "@/components/auth/authSlice";
import logger from "@/core/logger";
import { LOGIN_URL } from "@/constants";
import useRedirect from "@/core/useRedirect";
import { useRouter } from "next/router";
import {
  LocalStorageKeys,
  setLocalStorageItem,
} from "@/core/localStorage.utils";

const useAuth = (username: string, password: string) => {
  const dispatch = useDispatch();
  const { redirectUrl } = useRedirect();
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    if (username === "" || password === "") {
      logger.warn("Username or password are empty.", { username, password });
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        qs.stringify({
          grant_type: "password",
          client_id: "haemo",
          username: username,
          password: password,
          scope: "openid",
        }),
      );
      if (response.status === 200) {
        const decodedToken = jwtDecode(response.data.access_token);
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        const userId = getUserIdFromAccessToken(accessToken);
        dispatch(setUserId(userId));
        dispatch(
          setRoles((decodedToken as any)?.resource_access?.haemo?.roles ?? []),
        );
        dispatch(setCenterId((decodedToken as any)?.center_id ?? ""));
        setLocalStorageItem(LocalStorageKeys.accessToken, accessToken);
        setLocalStorageItem(LocalStorageKeys.refreshToken, refreshToken);
        router.push({
          pathname: redirectUrl,
        });
      }
    } catch (err) {
      logger.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  const handleLogout = useCallback(() => {}, []);

  return { handleLogin, handleLogout };
};

export default useAuth;
