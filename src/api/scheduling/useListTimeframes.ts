import { useState } from "react";
import { schedulingApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { GetTimeFrameResponse } from "@/@types/scheduling";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { usePagination } from "@/api/usePagination";

export const useListTimeframes = ({
  pageNumber = 1,
  pageSize = 20,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const [data, setData] = useState<GetTimeFrameResponse[]>([]);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();
  const pagination = usePagination(pageNumber, pageSize);

  const fetch = async (
    professionalId: number,
    customPageNumber?: number,
    customPageSize?: number,
  ) => {
    const response = await handleFn(
      async () =>
        await schedulingApi.api.v2TimeFramesList(
          {
            pageNumber: customPageNumber ?? pagination.pageNumber,
            pageSize: customPageSize ?? pagination.pageSize,
            professionalId,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.timeFrames ?? []);

    pagination.handlePaginationPayload(response?.data);

    return {
      meetings: response.data?.timeFrames ?? [],
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
