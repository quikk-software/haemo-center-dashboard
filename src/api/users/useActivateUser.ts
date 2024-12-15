import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useState } from "react";
import { Dispatch } from "redux";

const useActivateUser = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const request = async (userId: string) => {
    setIsLoading(true);
    userApi.api
      .v1UsersActivateDetail(userId, {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      })
      .then(() => setResponse(true))
      .finally(() => setIsLoading(false));
  };

  return { request, response, isLoading };
};

export const activateUser = async (
  userId: string,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await userApi.api.v1UsersActivateDetail(userId, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
  return response.data;
};

export default useActivateUser;
