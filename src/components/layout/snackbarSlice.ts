import { AlertColor } from "@mui/material";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type SnackbarState = {
  open: boolean,
  message: string,
  severity: AlertColor,
}

export type SnackbarSliceState = {
  snackbarState: SnackbarState,
};

export const initialState: SnackbarSliceState = {
  snackbarState: { open: false, message: "", severity: "info" as AlertColor },
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarState: (state, action: PayloadAction<SnackbarState>) => {
      state.snackbarState = action.payload;
    },
  },
});

export const {
  setSnackbarState,
} = snackbarSlice.actions;
export default snackbarSlice.reducer;
