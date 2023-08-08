import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type NewsState = {
  headline?: string,
  text?: string,
  creatorName?: string,
  image?: File,
  link?: string,
};

export const initialState: NewsState = {
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
    setImage: (state, action: PayloadAction<File>) => {
      state.image = action.payload;
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
  },
});

export const {
  setHeadline,
  setText,
  setCreatorName,
  setImage,
  setLink,
} = newsSlice.actions;
export default newsSlice.reducer;
