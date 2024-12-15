import { getApi, schedulingApi } from "@/@types";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { Dispatch } from "redux";
import { setMeetings } from "@/components/todo/todoSlice";
import { MeetingType } from "@/components/overview/meetings/meeting.types";
import { setAllMeetings } from "@/components/overview/meetings/meetingSlice";

export type MeetingQuery = {
  state?: MeetingType | "";
  // sort by createdAt
  sort?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
};

const useListAllMeetingsV2 = () => {
  const { accessToken, refreshToken } = useSelector((s: Store) => s.auth);
  const dispatch = useDispatch();

  const request = async (query: MeetingQuery) => {
    const data = await getAllMeetingsV2(
      query,
      accessToken,
      refreshToken,
      dispatch,
    );

    if (data !== undefined) {
      dispatch(setMeetings(data.meetings));
      dispatch(setAllMeetings(data.meetings));
    }
  };

  return { request };
};

export const getAllMeetingsV2 = async (
  query: MeetingQuery,
  accessToken: string | null,
  refreshToken: string | null,
  dispatch: Dispatch,
) => {
  const response = await schedulingApi.api.v2MeetingCenterAllMeetingsList(
    { ...query, state: String(query.state) },
    {
      ...(await getApi(accessToken, refreshToken, dispatch)),
    },
  );

  return response.data;
};

export default useListAllMeetingsV2;
