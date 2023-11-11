import React, { useEffect } from "react";
import useQuery from "@/utils/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { setMeeting } from "@/components/overview/meetings/meetingSlice";
import logger from "@/core/logger";

const MeetingDetail: React.FC = () => {
  const id = useQuery("id");
  const dispatch = useDispatch();

  const { meeting, meetings } = useSelector((store: Store) => store.meetings);

  useEffect(() => {
    // Meeting Id is always a number

    const meetingCandidate = meetings.find((m) => m.id === Number(id));
    if (id !== undefined && meetingCandidate !== undefined) {
      dispatch(setMeeting(meetingCandidate));
    } else {
      logger.error("No meetings stored. Please access meetings first.");
    }
  }, []);

  return (
    <>
      {id}
      {meeting ? meeting.id : "..."}
    </>
  );
};

export default MeetingDetail;
