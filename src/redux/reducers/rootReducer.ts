import { combineReducers } from "redux";
import requestReducer from "@/requests/requestSlice";

export const rootReducer = combineReducers({
  request: requestReducer,
});
