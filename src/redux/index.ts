import { rootReducer } from "./reducers/rootReducer";
import {
  initialState as requestInitialState,
  RequestState,
} from "../requests/requestSlice";
import {
  AuthState,
  initialState as authInitialState,
} from "../components/auth/authSlice";
import {
  I18nState,
  initialState as i18nInitialState,
} from "../components/i18n/i18nSlice";
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import {
  getLocalStorageItem,
  LocalStorageKey,
} from "@/core/localStorage.utils";
import { Language } from "@/i18n/i18n.types";
import {
  NewsState,
  initialState as newsInitialState,
} from "../components/news/newsSlice";
import {
  SnackbarSliceState,
  initialState as snackbarInitialState,
} from "@/components/layout/snackbarSlice";
import {
  UserOverviewState,
  initialState as userOverviewInitialState,
} from "@/components/overview/users/userOverviewSlice";
import {
  PrescriptionState,
  initialState as prescriptionInitialState,
} from "@/components/overview/prescriptions/prescriptionSlice";
import {
  MeetingState,
  initialState as meetingInitialState,
} from "@/components/overview/meetings/meetingSlice";
import {
  initialState as tableInitialState,
  TableState,
} from "@/components/overview/table/tableSlice";
import table from "@/components/overview/table";

const accessToken = getLocalStorageItem<string, string | null>(
  LocalStorageKey.accessToken,
  authInitialState.accessToken,
);

const refreshToken = getLocalStorageItem<string, string | null>(
  LocalStorageKey.refreshToken,
  authInitialState.refreshToken,
);

const language = getLocalStorageItem<Language, Language>(
  LocalStorageKey.language,
  i18nInitialState.language,
);

export interface Store {
  request: RequestState;
  auth: AuthState;
  snackbar: SnackbarSliceState;
  news: NewsState;
  i18n: I18nState;
  userOverview: UserOverviewState;
  prescriptions: PrescriptionState;
  meetings: MeetingState;
  table: TableState;
}

const initialStore: Store = {
  request: requestInitialState,
  auth: {
    ...authInitialState,
    accessToken,
    refreshToken,
  },
  snackbar: {
    ...snackbarInitialState,
  },
  news: {
    ...newsInitialState,
  },
  i18n: {
    ...i18nInitialState,
    language,
  },
  userOverview: { ...userOverviewInitialState },
  prescriptions: { ...prescriptionInitialState },
  meetings: { ...meetingInitialState },
  table: { ...tableInitialState },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialStore,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
