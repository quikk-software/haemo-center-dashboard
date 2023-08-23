import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { TableConfig } from "@/components/overview/table";
import { useCallback, useState } from "react";
import { ListUsersResponse } from "@/@types/user";

type Props = TableConfig;

const useGetUsers = ({ query, pageSize, pageNumber }: Props) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<ListUsersResponse["users"]>([]);

  const request = useCallback(async () => {
    const response = await userApi.api.v1UsersList(
      { q: query, pageSize, pageNumber },
      {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      },
    );
    setResponse(response.data.users);
  }, [accessToken, dispatch, pageNumber, pageSize, query, refreshToken]);

  return { request, response };
};

export const getUsers = async ({ query, pageSize, pageNumber} : Props, accessToken: string | null, refreshToken: string | null, dispatch: Dispatch) => {
  const response = await userApi.api.v1UsersList(
    { q: query, pageSize, pageNumber },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response.data;
};

export default useGetUsers;
