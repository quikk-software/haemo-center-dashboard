import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetUserResponse } from "@/@types/user";
import { GetPrescriptionResponseV2 } from "@/@types/prescription";
import { GetMeetingResponseV2 } from "@/@types/scheduling";

export type TodoState = {
  users: GetUserResponse[];
  prescriptions: GetPrescriptionResponseV2[];
  meetings: GetMeetingResponseV2[];
  refetchUsers: boolean;
  refetchPrescriptions: boolean;
  refetchMeetings: boolean;
};

export const initialState: TodoState = {
  users: [],
  prescriptions: [],
  meetings: [],
  refetchUsers: false,
  refetchPrescriptions: false,
  refetchMeetings: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<GetUserResponse[]>) => {
      state.users = action.payload;
    },
    setRefetchUsers: (state, action: PayloadAction<boolean>) => {
      state.refetchUsers = action.payload;
    },
    setPrescriptions: (
      state,
      action: PayloadAction<GetPrescriptionResponseV2[]>,
    ) => {
      state.prescriptions = action.payload;
    },
    setRefetchPrescriptions: (state, action: PayloadAction<boolean>) => {
      state.refetchPrescriptions = action.payload;
    },
    setMeetings: (state, action: PayloadAction<GetMeetingResponseV2[]>) => {
      state.meetings = action.payload;
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
