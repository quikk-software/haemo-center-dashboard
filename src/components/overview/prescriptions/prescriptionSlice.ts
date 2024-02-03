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
  prescriptionTableSort: "asc" | "desc" | undefined;
  prescriptionTableFilter: boolean | undefined;
};

export const initialState: PrescriptionState = {
  prescriptions: [],
  prescription: null,
  prescriptionPatientName: null,
  prescriptionProfessionalName: null,
  allPrescriptions: [],
  prescriptionTableSort: undefined,
  prescriptionTableFilter: undefined,
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
    setPrescriptionTableFilter: (
      state,
      action: PayloadAction<PrescriptionState["prescriptionTableFilter"]>,
    ) => {
      state.prescriptionTableFilter = action.payload;
    },
    setPrescriptionTableSort: (
      state,
      action: PayloadAction<PrescriptionState["prescriptionTableSort"]>,
    ) => {
      state.prescriptionTableSort = action.payload;
    },
  },
});

export const {
  setPrescriptions,
  setPrescription,
  setPrescriptionProfessionalName,
  setPrescriptionPatientName,
  setAllPrescriptions,
  setPrescriptionTableSort,
  setPrescriptionTableFilter,
} = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
