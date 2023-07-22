import { rootReducer } from "./reducers/rootReducer";
import {
  initialState as requestInitialState,
  RequestState,
} from "../requests/requestSlice";
import {
  AuthState,
  initialState,
  initialState as authInitialState,
} from "../components/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import {
  getLocalStorageItem,
  LocalStorageKeys,
} from "@/core/localStorage.utils";

const accessToken = getLocalStorageItem<string, string | null>(
  LocalStorageKeys.accessToken,
  authInitialState.accessToken,
);
const refreshToken = getLocalStorageItem<string, string | null>(
  LocalStorageKeys.refreshToken,
  authInitialState.refreshToken,
);

export interface Store {
  request: RequestState;
  auth: AuthState;
}

const initialStore: Store = {
  request: requestInitialState,
  auth: {
    ...authInitialState,
    accessToken,
    refreshToken,
  },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialStore,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
