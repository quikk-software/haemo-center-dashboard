import { useState } from "react";
import { schedulingApi, getApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { GetMeetingResponseV2 } from "@/@types/scheduling";
import { Store } from "@/redux";
import { useApiStates } from "@/api/useApiStates";
import { usePagination } from "@/api/usePagination";

export const useListMeetings = ({
  pageNumber = 1,
  pageSize = 20,
}: {
  pageNumber?: number;
  pageSize?: number;
}) => {
  const [data, setData] = useState<GetMeetingResponseV2[]>([]);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();
  const pagination = usePagination(pageNumber, pageSize);

  const fetch = async (
    customState?: string,
    customPageNumber?: number,
    customPageSize?: number,
  ) => {
    const response = await handleFn(
      async () =>
        await schedulingApi.api.v2MeetingCenterAllMeetingsList(
          {
            pageNumber: customPageNumber ?? pagination.pageNumber,
            pageSize: customPageSize ?? pagination.pageSize,
            state: customState,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.meetings ?? []);

    pagination.handlePaginationPayload(response?.data);

    return response.data?.meetings ?? [];
  };

  return {
    ...apiStates,
    ...pagination,
    fetch,
    data,
  };
};
