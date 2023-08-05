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
import { configureStore } from "@reduxjs/toolkit";
import {
  getLocalStorageItem,
  LocalStorageKey,
} from "@/core/localStorage.utils";
import { Language } from "@/i18n/i18n.types";
import { NewsState, initialState as newsInitialState } from "../components/news/newsSlice";

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
  news: NewsState;
  i18n: I18nState;
}

const initialStore: Store = {
  request: requestInitialState,
  auth: {
    ...authInitialState,
    accessToken,
    refreshToken,
  },
  news: {
    ...newsInitialState,
  },
  i18n: {
    ...i18nInitialState,
    language,
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
