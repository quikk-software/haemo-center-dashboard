import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getUserIdFromAccessToken, isTokenValid } from "@/auth/auth.utils";
import {
  initialState,
  reset,
  setAccessToken,
  setCenterId,
  setRefreshToken,
  setRoles,
  setUserId,
  setUsername,
} from "@/components/auth/authSlice";
import logger from "@/core/logger";
import useRedirect from "@/core/useRedirect";
import { useRouter } from "next/router";
import { Store } from "@/redux";
import { getLoginURL } from "@/api/urls";
import { useSnackbarComponent } from "@/components/layout/Snackbar";
import { ADMIN_ROLE, CENTER_ROLE } from "@/components/auth/auth.constants";
import { isPublicUrl } from "@/components/auth/AuthGuard";

const useAuth = () => {
  const dispatch = useDispatch();
  const { redirectUrl } = useRedirect();
  const router = useRouter();
  const { displaySuccess, displayWarning, displayError } =
    useSnackbarComponent();

  const { accessToken, username, userId, roles } = useSelector(
    (store: Store) => store.auth,
  );

  const getUserData = useCallback(
    async () => {
      if (userId === initialState.userId) {
        return undefined;
      }

      // TODO: Sobald die API Route steht: Tatsächlichen Namen fetchen

      // const res = await axios.get(getUserDataURL(userId), {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
      //
      // // TODO: Add profile picture, etc...
      //
      // const {
      //   data,
      // }: {
      //   data: {
      //     username: string;
      //   };
      // } = res;

      const username = "";

      dispatch(setUsername(username));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken],
  );

  const setUserDataInReduxStore = (accessToken: string) => {
    const decodedToken = jwtDecode(accessToken);
    const userId = getUserIdFromAccessToken(accessToken);
    dispatch(setUserId(userId));
    dispatch(
      setRoles((decodedToken as any)?.resource_access?.haemo?.roles ?? []),
    );
    dispatch(setCenterId((decodedToken as any)?.center_id ?? ""));
  };

  const handleLogin = useCallback(
    async (username: string, password: string) => {
      if (username === "" || password === "") {
        logger.warn("Username or password are empty.", { username, password });
        return;
      }

      try {
        const response = await axios.post(
          getLoginURL(),
          qs.stringify({
            grant_type: "password",
            client_id: "haemo",
            username: username,
            password: password,
            scope: "openid",
          }),
        );
        if (response.status === 200) {
          displaySuccess("Anmeldung erfolgreich."); // const decodedToken = jwtDecode(response.data.access_token);
          const accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;
          dispatch(setAccessToken(accessToken));
          dispatch(setRefreshToken(refreshToken));
          setUserDataInReduxStore(accessToken);
          router.push({
            pathname: redirectUrl,
          });
        }
      } catch (err) {
        logger.error(err);
        displayError("Fehler bei der Anmeldung.");
      }
    },
    [accessToken],
  );

  const handleLogout = useCallback(() => {
    dispatch(reset());
    router.push({
      pathname: "/auth/login",
    });
  }, []);

  const isLoggedIn = useCallback(() => {
    return isTokenValid(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (
      roles.some((role) => role === CENTER_ROLE || role === ADMIN_ROLE) ||
      isPublicUrl(router.pathname)
    ) {
      return;
    }
    router.push({
      pathname: "/auth/login",
    });
  }, [roles]);

  return {
    getUserData,
    handleLogin,
    handleLogout,
    isLoggedIn: isLoggedIn(),
    username,
    setUserDataInReduxStore,
  };
};

export default useAuth;
