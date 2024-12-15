import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";

type Props = { code: string };

const useVerifyAccount = ({ code }: Props) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(async () => {
    await userApi.api.v1VerificationCodeVerifyAccountDetail(code, {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    });
    setResponse(true);
  }, [accessToken, dispatch, code, refreshToken]);

  return { request, response };
};

export const verifyAccount = async (
  { code }: Props,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await userApi.api.v1VerificationCodeVerifyAccountDetail(
    code,
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response.data;
};

export default useVerifyAccount;
