import { createSlice } from "@reduxjs/toolkit";

export interface RequestState {
  activeRequests: number;
}

export const initialState: RequestState = {
  activeRequests: 0,
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    increaseNumberOfRequests: (state) => {
      state.activeRequests = state.activeRequests + 1;
    },
    decreaseNumberOfRequests: (state) => {
      state.activeRequests = state.activeRequests - 1;
    },
  },
});

export const { increaseNumberOfRequests, decreaseNumberOfRequests } =
  requestSlice.actions;
export const selectActiveRequests = (state: RequestState) =>
  state.activeRequests;
export default requestSlice.reducer;
