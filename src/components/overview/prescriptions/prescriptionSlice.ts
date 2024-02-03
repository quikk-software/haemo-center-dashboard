import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  GetPrescriptionResponse,
  ListPrescriptionsResponse,
} from "@/@types/prescription";

export type PrescriptionState = {
  prescriptions: GetPrescriptionResponse[];
  prescription: GetPrescriptionResponse | null;
  prescriptionPatientName: string | null;
  prescriptionProfessionalName: string | null;
  allPrescriptions: ListPrescriptionsResponse["prescriptions"];
};

export const initialState: PrescriptionState = {
  prescriptions: [],
  prescription: null,
  prescriptionPatientName: null,
  prescriptionProfessionalName: null,
  allPrescriptions: [],
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
    setAllPrescriptions: (
      state,
      action: PayloadAction<ListPrescriptionsResponse["prescriptions"]>,
    ) => {
      state.allPrescriptions = action.payload;
    },
  },
});

export const {
  setPrescriptions,
  setPrescription,
  setPrescriptionProfessionalName,
  setPrescriptionPatientName,
  setAllPrescriptions,
} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
