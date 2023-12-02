import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetPrescriptionResponse } from "@/@types/prescription";

export type PrescriptionState = {
  prescriptions: GetPrescriptionResponse[];
  prescription: GetPrescriptionResponse | null;
};

export const initialState: PrescriptionState = {
  prescriptions: [],
  prescription: null,
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
    setPrescription: (state, action) => {
      state.prescription = action.payload;
    },
  },
});

export const { setPrescriptions, setPrescription } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
