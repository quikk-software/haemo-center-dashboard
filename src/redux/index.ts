import { rootReducer } from "./reducers/rootReducer";
import {
  initialState as requestInitialState,
  RequestState,
} from "../requests/requestSlice";
import { configureStore } from "@reduxjs/toolkit";

export interface Store {
  request: RequestState;
}

const initialStore: Store = {
  request: requestInitialState,
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialStore,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
