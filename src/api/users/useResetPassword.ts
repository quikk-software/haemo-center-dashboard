import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback } from "react";

const useResetPassword = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  // const [response, setResponse] = useState<ListUsersResponse["users"]>([]);

  const request = useCallback(
    async (verificationCode: string, newPassword: string) => {
      const response = await userApi.api.v1ResetPasswordVerifyCreate(
        verificationCode,
        {
          newPassword,
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

export default useResetPassword;
