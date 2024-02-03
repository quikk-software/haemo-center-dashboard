import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ListPrescriptionsResponse } from "@/@types/prescription";
import logger from "@/core/logger";

export type TableSettings = Omit<ListPrescriptionsResponse, "prescriptions">;

export type TableState = {
  tableSettings: TableSettings;
};

export const initialState: TableState = {
  tableSettings: {},
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableSettings: (state, action: PayloadAction<TableSettings>) => {
      logger.log(`setTableSettings:response`, action.payload);
      state.tableSettings = action.payload;
    },
    setTableSettingsTable: (state, action: PayloadAction<TableSettings>) => {
      logger.log(`setTableSettings:table`, action.payload);
      state.tableSettings = action.payload;
    },
  },
});

export const { setTableSettings, setTableSettingsTable } = tableSlice.actions;
export default tableSlice.reducer;
