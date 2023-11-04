import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetPrescriptionResponse } from "@/@types/prescription";

export type PrescriptionState = {
  prescriptions: GetPrescriptionResponse[];
};

export const initialState: PrescriptionState = {
  prescriptions: [],
};

export const prescriptionSlice = createSlice({
  name: "prescriptions",
  initialState,
  reducers: {
    setPrescriptions: (
      state,
      action: PayloadAction<GetPrescriptionResponse[]>,
    ) => {
      state.prescriptions = action.payload;
    },
  },
});

export const { setPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
