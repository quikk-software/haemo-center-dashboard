import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback } from "react";

const usePasswordReset = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const request = useCallback(
    async (email: string) => {
      await userApi.api.v1ResetPasswordRequestCreate(
        {
          email,
        },
        {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        },
      );
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request };
};

export default usePasswordReset;
