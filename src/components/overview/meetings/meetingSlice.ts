import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetMeetingResponse } from "@/@types/scheduling";

export type MeetingState = {
  meetings: GetMeetingResponse[];
  meeting: GetMeetingResponse | null;
  schedulingPatientName: string | null;
  schedulingProfessionalName: string | null;
};

export const initialState: MeetingState = {
  meetings: [],
  meeting: null,
  schedulingPatientName: null,
  schedulingProfessionalName: null,
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
    setPrescriptionPatientName: (state, action: PayloadAction<string>) => {
      state.schedulingPatientName = action.payload;
    },
    setPrescriptionProfessionalName: (state, action: PayloadAction<string>) => {
      state.schedulingProfessionalName = action.payload;
    },
  },
});

export const {
  setMeetings,
  setMeeting,
  setPrescriptionProfessionalName,
  setPrescriptionPatientName,
} = meetingSlice.actions;
export default meetingSlice.reducer;
