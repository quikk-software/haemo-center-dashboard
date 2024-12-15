import { combineReducers } from "redux";
import requestReducer from "@/requests/requestSlice";
import authReducer from "@/components/auth/authSlice";
import todoReducer from "@/components/todo/todoSlice";
import i18nReducer from "@/components/i18n/i18nSlice";
import newsReducer from "@/components/news/newsSlice";
import snackbarReducer from "@/components/layout/snackbarSlice";
import userOverviewReducer from "@/components/overview/users/userOverviewSlice";
import prescriptionReducer from "@/components/overview/prescriptions/prescriptionSlice";
import meetingsReducer from "@/components/overview/meetings/meetingSlice";
import tableReducer from "@/components/overview/table/tableSlice";
import centerOverviewReducer from "@/components/overview/centers/centerOverviewSlice";
import { Store } from "@/redux";

export const rootReducer = combineReducers<Store>({
  request: requestReducer,
  auth: authReducer,
  todo: todoReducer,
  snackbar: snackbarReducer,
  i18n: i18nReducer,
  news: newsReducer,
  userOverview: userOverviewReducer,
  prescriptions: prescriptionReducer,
  meetings: meetingsReducer,
  table: tableReducer,
  centerOverview: centerOverviewReducer,
});
