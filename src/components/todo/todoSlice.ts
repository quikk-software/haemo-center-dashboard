import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetUserResponse } from "@/@types/user";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";
import { GetMeetingResponseV2 } from "@/@types/scheduling";

export type TodoState = {
  users: GetUserResponse[];
  filteredUsers?: GetUserResponse[];
  usersTotalCount: number | undefined;
  prescriptions: GetPrescriptionResponseV2[];
  filteredPrescriptions?: GetPrescriptionResponseV2[];
  prescriptionsTotalCount: number | undefined;
  meetings: GetMeetingResponseV2[];
  filteredMeetings?: GetMeetingResponseV2[];
  meetingsTotalCount: number | undefined;
  refetchUsers: boolean;
  refetchPrescriptions: boolean;
  refetchMeetings: boolean;
};

export const initialState: TodoState = {
  users: [],
  filteredUsers: undefined,
  usersTotalCount: undefined,
  prescriptions: [],
  filteredPrescriptions: undefined,
  prescriptionsTotalCount: undefined,
  meetings: [],
  filteredMeetings: undefined,
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
    setFilteredUsers: (
      state,
      action: PayloadAction<GetUserResponse[] | undefined>,
    ) => {
      state.filteredUsers = action.payload;
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
    setFilteredPrescriptions: (
      state,
      action: PayloadAction<GetPrescriptionResponseV2[] | undefined>,
    ) => {
      state.filteredPrescriptions = action.payload;
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
    setFilteredMeetings: (
      state,
      action: PayloadAction<GetMeetingResponseV2[] | undefined>,
    ) => {
      state.filteredMeetings = action.payload;
    },
    setRefetchMeetings: (state, action: PayloadAction<boolean>) => {
      state.refetchMeetings = action.payload;
    },
  },
});

export const {
  setUsers,
  setFilteredUsers,
  setRefetchUsers,
  setPrescriptions,
  setFilteredPrescriptions,
  setRefetchPrescriptions,
  setMeetings,
  setFilteredMeetings,
  setRefetchMeetings,
} = todoSlice.actions;
export default todoSlice.reducer;
