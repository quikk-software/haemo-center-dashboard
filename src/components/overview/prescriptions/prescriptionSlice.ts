import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetPrescriptionResponse } from "@/@types/prescription";

export type PrescriptionState = {
  prescriptions: GetPrescriptionResponse[];
  prescription: GetPrescriptionResponse | null;
  prescriptionPatientName: string | null;
  prescriptionProfessionalName: string | null;
};

export const initialState: PrescriptionState = {
  prescriptions: [],
  prescription: null,
  prescriptionPatientName: null,
  prescriptionProfessionalName: null,
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
    setPrescriptionPatientName: (state, action: PayloadAction<string>) => {
      state.prescriptionPatientName = action.payload;
    },
    setPrescriptionProfessionalName: (state, action: PayloadAction<string>) => {
      state.prescriptionProfessionalName = action.payload;
    },
  },
});

export const {
  setPrescriptions,
  setPrescription,
  setPrescriptionProfessionalName,
  setPrescriptionPatientName,
} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
