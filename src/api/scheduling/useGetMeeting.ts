import { getApi, schedulingApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import logger from "@/core/logger";
import { setMeeting } from "@/components/overview/meetings/meetingSlice";

export type MeetingQuery = {
  isAccepted?: boolean;
  // sort by createdAt
  sort?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};

const useGetMeeting = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (id: number) => {
      const res = await getMeeting(
        // Prisma ist kacke und fängt bei 1 an...
        id,
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        dispatch(setMeeting(res));
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const getMeeting = async (
  id: number,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const res = await schedulingApi.api.v1MeetingDetail(id, {
    ...(await getApi(accessToken, refreshToken, dispatch)),
  });
  logger.debug("result", res.data);
  return res.data;
};

export default useGetMeeting;
