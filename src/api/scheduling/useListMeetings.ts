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
    customStates?: string[],
    customSort?: "asc" | "desc",
    customPageNumber?: number,
    customPageSize?: number,
    startDate?: Date,
    endDate?: Date,
    professionalIds? : number[],
  ) => {
    const response = await handleFn(
      async () => 
        await schedulingApi.api.v2MeetingsCenterAllMeetingsList(
          {
            pageNumber: customPageNumber ?? pagination.pageNumber,
            pageSize: customPageSize ?? pagination.pageSize,
            startDate: startDate,
            endDate: endDate,
            professionalIds: professionalIds,
            states: customStates,
            sort: customSort,
          },
          {
            ...(await getApi(accessToken, refreshToken, dispatch)),
          },
        ),
    );

    setData(response.data?.meetings ?? []);

    pagination.handlePaginationPayload(response?.data);

    return {
      meetings: response.data?.meetings ?? [],
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
