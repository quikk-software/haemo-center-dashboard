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
  isTokenValid,
} from "@/auth/auth.utils";
import { setAccessToken, setRefreshToken } from "@/components/auth/authSlice";
import logger from "@/core/logger";
import { useRouter } from "next/router";
import useRedirect from "@/core/useRedirect";
import { hasPageBeenMounted } from "@/core/utils";
import useAuth from "@/components/auth/useAuth";
import LoadingScreen from "@/components/layout/LoadingScreen";
import pages from "@/routes";
import { NoSsr } from "@mui/material";

const publicUrls = [
  "/auth/login",
  "/auth/forgot-password",
  "/verify/account/[code]",
];
const isPublicUrl = (url: string) => {
  const isPublic = publicUrls.includes(url);
  logger.debug(`${isPublic}: ${url}`);
  return isPublic;
};

const AuthGuard: React.FC<PropsWithChildren<Record<never, any>>> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { redirectUrl } = useRedirect();
  const { setUserDataInReduxStore, isLoggedIn } = useAuth();

  const isAccessibleWithoutAccount = useMemo(
    () => isPublicUrl(router.pathname),
    [router.pathname],
  );

  const { accessToken, refreshToken } = useSelector(
    (store: Store) => store.auth,
  );

  const [showLoadingScreen, setShowLoadingScreen] = useState(
    true && !isLoggedIn,
  );

  const onTokenValid = () => {
    if (accessToken !== null) {
      setUserDataInReduxStore(accessToken);
      // redirect to redirect URL if not already on a valid page
      if (!pages.map(({ pathname }) => pathname).includes(router.pathname)) {
        router.push(redirectUrl);
      }
    }
  };

  const checkAuth = useCallback(() => {
    if (isLoggedIn || isAccessibleWithoutAccount) {
      return;
    }

    logger.debug(`Checking Access for <${router.pathname}>.`);
    if (isTokenValid(accessToken)) {
      onTokenValid();
      return;
    }
    (async () => {
      if (refreshToken === null) {
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
    })();
  }, [
    accessToken,
    dispatch,
    isLoggedIn,
    onTokenValid,
    refreshToken,
    router.pathname,
  ]);

  const hideContent = useCallback(() => {
    if (isLoggedIn || isAccessibleWithoutAccount) {
      setShowLoadingScreen(false);
      return;
    }

    logger.info(`Hiding children for <${router.pathname}>.`);
  }, [isAccessibleWithoutAccount, isLoggedIn, router.pathname]);

  /**
   * Taken from https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated
   */
  useEffect(() => {
    checkAuth();

    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", checkAuth);

    if (!isLoggedIn && hasPageBeenMounted() && !isPublicUrl(router.pathname)) {
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
    setShowLoadingScreen(true);
    if (isTokenValid(accessToken)) {
      onTokenValid();
    }
    setShowLoadingScreen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, accessToken]);

  useEffect(() => {
    setTimeout(() => setShowLoadingScreen(false), 500);
  });

  if (!showLoadingScreen || isAccessibleWithoutAccount) {
    return (
      <NoSsr>
        <>{children}</>
      </NoSsr>
    );
  }

  return (
    <NoSsr>
      <LoadingScreen />
    </NoSsr>
  );
};

export default AuthGuard;
