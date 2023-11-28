import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";

type Props = {
  id: string;
};

const useDeactivateUser = ({ id }: Props) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(async () => {
    const res = await userApi.api.v1UsersDeactivateDetail(id, {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    });
    setResponse(true);
  }, [accessToken, dispatch, refreshToken]);

  return { request, response };
};

export const deactivateUser = async (
  { id }: Props,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await userApi.api.v1UsersDeactivateDetail(id, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
  return response.data;
};

export default useDeactivateUser;
