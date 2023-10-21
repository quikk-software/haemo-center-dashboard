import { combineReducers } from "redux";
import requestReducer from "@/requests/requestSlice";
import authReducer from "@/components/auth/authSlice";
import i18nReducer from "@/components/i18n/i18nSlice";
import newsReducer from "@/components/news/newsSlice";
import snackbarReducer from "@/components/layout/snackbarSlice";
import userOverviewReducer from "@/components/overview/userOverviewSlice";

export const rootReducer = combineReducers({
  request: requestReducer,
  auth: authReducer,
  snackbar: snackbarReducer,
  i18n: i18nReducer,
  news: newsReducer,
  userOverview: userOverviewReducer,
});
