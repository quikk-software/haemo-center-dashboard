import { combineReducers } from "redux";
import requestReducer from "@/requests/requestSlice";
import authReducer from "@/components/auth/authSlice";

export const rootReducer = combineReducers({
  request: requestReducer,
  auth: authReducer,
});
