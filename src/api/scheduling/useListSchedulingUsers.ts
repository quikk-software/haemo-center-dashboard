import { useState } from "react";
import { schedulingApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { GetSchedulingUserResponse } from "@/@types/scheduling";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { usePagination } from "@/api/usePagination";

export const useListSchedulingUsers = ({
  pageNumber = 1,
  pageSize = 20,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const [data, setData] = useState<GetSchedulingUserResponse[]>([]);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();
  const pagination = usePagination(pageNumber, pageSize);

  const fetch = async (
    role?: string,
    customPageNumber?: number,
    customPageSize?: number,
  ) => {
    const response = await handleFn(
      async () =>
        await schedulingApi.api.v1CenterSchedulingUsersList(
          {
            role,
            pageNumber: customPageNumber ?? pagination.pageNumber,
            pageSize: customPageSize ?? pagination.pageSize,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.schedulingUsers ?? []);

    pagination.handlePaginationPayload(response?.data);

    return {
      meetings: response.data?.schedulingUsers ?? [],
      count: response.data.count,
    };
  };

  return {
    ...apiStates,
    ...pagination,
    fetch,
    data,
  };
};
