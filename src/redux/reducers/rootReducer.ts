import { combineReducers } from "redux";
import requestReducer from "@/requests/requestSlice";
import authReducer from "@/components/auth/authSlice";
import i18nReducer from "@/components/i18n/i18nSlice";

export const rootReducer = combineReducers({
  request: requestReducer,
  auth: authReducer,
  i18n: i18nReducer,
});
