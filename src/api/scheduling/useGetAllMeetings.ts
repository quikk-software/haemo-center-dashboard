import { getApi, schedulingApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import logger from "@/core/logger";
import { setTableSettings } from "@/components/overview/table/tableSlice";
import { setAllMeetings } from "@/components/overview/meetings/meetingSlice";
import { MeetingType } from "@/components/overview/meetings/meeting.types";
import { getObjectWithUndefinedFieldsRemoved } from "@/utils/utils";

export type MeetingQuery = {
  state?: MeetingType | "";
  // sort by createdAt
  sort?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};

const useGetAllMeetings = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (query: MeetingQuery) => {
      const res = await getAllMeetings(
        // Prisma ist kacke und fängt bei 1 an...
        query
          ? getObjectWithUndefinedFieldsRemoved({
              ...query,
              pageNumber: (query.pageNumber ?? 0) + 1,
            })
          : {},
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        const { meetings, ...rest } = res;
        dispatch(setAllMeetings(meetings));
        dispatch(
          setTableSettings({
            ...rest,
            // Prisma ist kacke und fängt bei 1 an...
            pageNumber: res.pageNumber ? res.pageNumber - 1 : 0,
          }),
        );
        // dispatch(setTableSettings(rest));
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const getAllMeetings = async (
  query: MeetingQuery,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const res = await schedulingApi.api.v1MeetingCenterAllMeetingsList(
    { ...query, state: String(query.state) },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  logger.debug("result", res.data);
  return res.data;
};

export default useGetAllMeetings;
