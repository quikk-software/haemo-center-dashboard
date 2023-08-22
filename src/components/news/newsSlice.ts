import { AlertColor } from "@mui/material";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type SnackbarState = {
  open: boolean,
  message: string,
  severity: AlertColor,
}

export type NewsState = {
  headline?: string,
  text?: string,
  creatorName?: string,
  image?: string,
  link?: string,
  snackbarState: SnackbarState,
};

export const initialState: NewsState = {
  snackbarState: { open: false, message: "", severity: "info" as AlertColor },
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setHeadline: (state, action: PayloadAction<string>) => {
      state.headline = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setCreatorName: (state, action: PayloadAction<string>) => {
      state.creatorName = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    setSnackbarState: (state, action: PayloadAction<SnackbarState>) => {
      state.snackbarState = action.payload;
    },
  },
});

export const {
  setHeadline,
  setText,
  setCreatorName,
  setImage,
  setLink,
  setSnackbarState,
} = newsSlice.actions;
export default newsSlice.reducer;
