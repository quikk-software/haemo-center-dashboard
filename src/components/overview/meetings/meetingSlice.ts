import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetMeetingResponse, ListMeetingResponse } from "@/@types/scheduling";
import { MeetingType as MeetingType } from "../meetings/meeting.types";

export type MeetingState = {
  meetings: GetMeetingResponse[];
  meeting: GetMeetingResponse | null;
  schedulingPatientName: string | null;
  schedulingProfessionalName: string | null;
  allMeetings: ListMeetingResponse["meetings"];
  meetingTableSort: "asc" | "desc" | undefined;
  meetingTableFilter: MeetingType | "";
};

export const initialState: MeetingState = {
  meetings: [],
  meeting: null,
  schedulingPatientName: null,
  schedulingProfessionalName: null,
  allMeetings: [],
  meetingTableSort: undefined,
  meetingTableFilter: "",
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
    setAllMeetings: (
      state,
      action: PayloadAction<ListMeetingResponse["meetings"]>,
    ) => {
      state.allMeetings = action.payload;
    },
    setMeetingTableFilter: (
      state,
      action: PayloadAction<MeetingState["meetingTableFilter"]>,
    ) => {
      state.meetingTableFilter = action.payload;
    },
    setMeetingTableSort: (
      state,
      action: PayloadAction<MeetingState["meetingTableSort"]>,
    ) => {
      state.meetingTableSort = action.payload;
    },
  },
});

export const {
  setMeetings,
  setMeeting,
  setPrescriptionProfessionalName,
  setPrescriptionPatientName,
  setMeetingTableSort,
  setAllMeetings,
  setMeetingTableFilter,
} = meetingSlice.actions;
export default meetingSlice.reducer;
