import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import {
  getAccessTokenUsingRefreshToken,
  isTokenExpired,
  isTokenValid,
} from "@/auth/auth.utils";
import { setAccessToken, setRefreshToken } from "@/components/auth/authSlice";
import logger from "@/core/logger";
import { useRouter } from "next/router";
import useRedirect from "@/core/useRedirect";
import { hasPageBeenMounted } from "@/core/utils";
import useAuth from "@/components/auth/useAuth";
import LoadingScreen from "@/components/layout/LoadingScreen";

type Props = {};

const publicUrls = ["/auth/login"];

const AuthGuard: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const { redirectUrl } = useRedirect();
  const router = useRouter();

  const isAllowedToAccessPage = useMemo(
    () => publicUrls.includes(router.pathname),
    [router.pathname],
  );
  const { accessToken, refreshToken } = useSelector(
    (store: Store) => store.auth,
  );

  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(accessToken));
  const [showChildren, setShowChildren] = useState(isAllowedToAccessPage);
  const { setUserDataInReduxStore, isLoggedIn: isLoggedInAuthHook } = useAuth();

  const [showLoadingScreen, setShowLoadingScreen] = useState(
    true && !isLoggedInAuthHook,
  );

  const onTokenValid = () => {
    if (accessToken !== null) {
      setUserDataInReduxStore(accessToken);
      setIsLoggedIn(true);
      setShowChildren(true);
      // redirect if not already on that page
      if (router.pathname !== redirectUrl) {
        router.push(redirectUrl);
      }
    }
  };

  const checkAuth = useCallback(() => {
    if (isLoggedInAuthHook) {
      return;
    }

    logger.debug(`Checking Access for <${router.pathname}>.`);
    if (isTokenValid(accessToken)) {
      onTokenValid();
      return;
    }
    (async () => {
      if (refreshToken === null) {
        setIsLoggedIn(false);
        return;
      }
      const res = await getAccessTokenUsingRefreshToken(refreshToken);
      if (
        res?.data !== undefined &&
        "access_token" in res.data &&
        "refresh_token" in res.data
      ) {
        const newAccessToken: string = (res.data.access_token as string) ?? "";
        const newRefreshToken: string =
          (res.data.refresh_token as string) ?? "";
        dispatch(setAccessToken(newAccessToken));
        dispatch(setRefreshToken(newRefreshToken));
        return;
      }
      setIsLoggedIn(false);
    })();
  }, [
    accessToken,
    dispatch,
    isLoggedInAuthHook,
    onTokenValid,
    refreshToken,
    router.pathname,
  ]);

  const hideContent = useCallback(() => {
    if (isLoggedInAuthHook || isAllowedToAccessPage) {
      return;
    }

    logger.info(`Hiding children for <${router.pathname}>.`);
    setShowChildren(false);
  }, [isAllowedToAccessPage, isLoggedInAuthHook, router.pathname]);

  /**
   * Taken from https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated
   */
  useEffect(() => {
    checkAuth();

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", checkAuth);

    if (!isLoggedIn && hasPageBeenMounted()) {
      router.push({
        pathname: `/auth/login`,
      });
    }

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", checkAuth);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useEffect(() => {
    setShowChildren(isAllowedToAccessPage);
  }, [router.pathname, isAllowedToAccessPage]);

  useEffect(() => {
    setShowChildren(false);
    if (isTokenValid(accessToken)) {
      onTokenValid();
    }
    setShowChildren(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, accessToken]);

  useEffect(() => {
    setTimeout(() => setShowLoadingScreen(false), 500);
  });

  if (showChildren && !showLoadingScreen) {
    return children;
  }

  return <LoadingScreen />;
};

export default AuthGuard;
