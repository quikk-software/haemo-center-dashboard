import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { GetUserResponse } from "@/@types/user";

export type UserOverviewState = {
  users: GetUserResponse[];
};

export const initialState: UserOverviewState = {
  users: [],
};

export const userOverviewSlice = createSlice({
  name: "userOverview",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<GetUserResponse[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userOverviewSlice.actions;
export default userOverviewSlice.reducer;
