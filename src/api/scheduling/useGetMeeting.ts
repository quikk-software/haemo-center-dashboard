import { useState } from "react";
import { schedulingApi, getApi } from "@/@types";
import { useApiStates } from "../useApiStates";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { GetMeetingResponseV2 } from "@/@types/scheduling";

export const useGetMeeting = () => {
  const [data, setData] = useState<GetMeetingResponseV2 | undefined>(undefined);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);

  const { handleFn, ...apiStates } = useApiStates();

  const fetch = async (meetingId: number) => {
    const response = await handleFn(
      async () =>
        await schedulingApi.api.v2MeetingsDetail(meetingId, {
          ...(await getApi(accessToken, refreshToken, dispatch)),
        }),
    );

    setData(response?.data);

    return response?.data;
  };

  return {
    ...apiStates,
    fetch,
    data,
  };
};
