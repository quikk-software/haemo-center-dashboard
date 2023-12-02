import { getApi, schedulingApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useCallback, useState } from "react";
import { Dispatch } from "redux";
import { setMeetings } from "@/components/overview/meetings/meetingSlice";
import logger from "@/core/logger";

const useGetMeetings = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const [response, setResponse] = useState<boolean | undefined>(undefined);

  const request = useCallback(
    async (id: string) => {
      const res = await getMeetings(
        { id },
        accessToken,
        refreshToken,
        dispatch,
      );

      if (res !== undefined) {
        dispatch(setMeetings(res.meetings));
      }
    },
    [accessToken, dispatch, refreshToken],
  );

  return { request, response };
};

export const getMeetings = async (
  { id }: { id: string },
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  if (id === undefined) {
    logger.error("useGetPrescriptions:::id is undefined");
    return;
  }
  // TODO: usePagination verwenden für die Params!
  const res = await schedulingApi.api.v1MeetingsUserDetail(
    id,
    {},
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );
  logger.debug(res.data);
  return res.data;
};

export default useGetMeetings;
