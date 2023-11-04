import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetMeetingResponse } from "@/@types/scheduling";

export type MeetingState = {
  meetings: GetMeetingResponse[];
};

export const initialState: MeetingState = {
  meetings: [],
};

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    setMeetings: (state, action: PayloadAction<GetMeetingResponse[]>) => {
      state.meetings = action.payload;
    },
  },
});

export const { setMeetings } = meetingSlice.actions;
export default meetingSlice.reducer;
