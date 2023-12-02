import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetMeetingResponse } from "@/@types/scheduling";

export type MeetingState = {
  meetings: GetMeetingResponse[];
  meeting: GetMeetingResponse | null;
};

export const initialState: MeetingState = {
  meetings: [],
  meeting: null,
};

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setMeetings: (state, action: PayloadAction<GetMeetingResponse[]>) => {
      state.meetings = action.payload;
    },
    setMeeting: (state, action: PayloadAction<GetMeetingResponse>) => {
      state.meeting = action.payload;
    },
  },
});

export const { setMeetings, setMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
