import { getApi, userApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { TableConfig } from "@/components/overview/table/table.types";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import { setUsers } from "@/components/overview/users/userOverviewSlice";
import { setCenters } from "@/components/overview/centers/centerOverviewSlice";

type Props = Pick<TableConfig, "pageSize" | "pageNumber">;

const useGetUsers = ({ pageSize, pageNumber }: Props) => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const request = useCallback(async () => {
    const response = await userApi.api.v1UsersCentersList(
      { pageSize, pageNumber },
      {
        ...(await getApi(accessToken, refreshToken, dispatch)),
      },
    );
    dispatch(setCenters(response.data.centers));
  }, [accessToken, dispatch, pageNumber, pageSize, refreshToken]);

  return { request };
};

export const getCenters = async (
  { pageSize, pageNumber }: Props,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await userApi.api.v1UsersCentersList(
    { pageSize, pageNumber },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  return response.data;
};

export default useGetUsers;
