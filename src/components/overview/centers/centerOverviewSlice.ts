import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetCenterUserResponse } from "@/@types/user";

export type CenterOverviewState = {
  centers: GetCenterUserResponse[];
};

export const initialState: CenterOverviewState = {
  centers: [],
};

export const centerOverviewSlice = createSlice({
  name: "centerOverview",
  initialState,
  reducers: {
    setCenters: (state, action: PayloadAction<GetCenterUserResponse[]>) => {
      state.centers = action.payload;
    },
  },
});

export const { setCenters } = centerOverviewSlice.actions;
export default centerOverviewSlice.reducer;
