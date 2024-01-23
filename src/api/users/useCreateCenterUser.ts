import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { PostCenterUserRequest } from "@/@types/user";

const useCreateCenterUser = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<string | undefined>(undefined);

  const request = useCallback(
    async (centerUserRequest: PostCenterUserRequest) => {
      const res = await userApi.api.v1UsersCenterCreate(centerUserRequest, {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      });
      setResponse(res.data.id);
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export default useCreateCenterUser;
