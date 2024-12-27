import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetUserResponse } from "@/@types/user";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";
import { GetMeetingResponseV2 } from "@/@types/scheduling";

export type TodoState = {
  users: GetUserResponse[];
  usersTotalCount: number | undefined;
  prescriptions: GetPrescriptionResponseV2[];
  prescriptionsTotalCount: number | undefined;
  meetings: GetMeetingResponseV2[];
  meetingsTotalCount: number | undefined;
  refetchUsers: boolean;
  refetchPrescriptions: boolean;
  refetchMeetings: boolean;
};

export const initialState: TodoState = {
  users: [],
  usersTotalCount: undefined,
  prescriptions: [],
  prescriptionsTotalCount: undefined,
  meetings: [],
  meetingsTotalCount: undefined,
  refetchUsers: false,
  refetchPrescriptions: false,
  refetchMeetings: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<{
        users: GetUserResponse[];
        count: number | undefined;
      }>,
    ) => {
      state.users = action.payload.users;
      state.usersTotalCount = action.payload.count;
    },
    setRefetchUsers: (state, action: PayloadAction<boolean>) => {
      state.refetchUsers = action.payload;
    },
    setPrescriptions: (
      state,
      action: PayloadAction<{
        prescriptions: GetPrescriptionResponseV2[];
        count: number | undefined;
      }>,
    ) => {
      state.prescriptions = action.payload.prescriptions;
      state.prescriptionsTotalCount = action.payload.count;
    },
    setRefetchPrescriptions: (state, action: PayloadAction<boolean>) => {
      state.refetchPrescriptions = action.payload;
    },
    setMeetings: (
      state,
      action: PayloadAction<{
        meetings: GetMeetingResponseV2[];
        count: number | undefined;
      }>,
    ) => {
      state.meetings = action.payload.meetings;
      state.meetingsTotalCount = action.payload.count;
    },
    setRefetchMeetings: (state, action: PayloadAction<boolean>) => {
      state.refetchMeetings = action.payload;
    },
  },
});

export const {
  setUsers,
  setRefetchUsers,
  setPrescriptions,
  setRefetchPrescriptions,
  setMeetings,
  setRefetchMeetings,
} = todoSlice.actions;
export default todoSlice.reducer;
