import { combineReducers } from "redux";
import { authProcess, loadingProcess } from "./authReducers";

export const allReducers = combineReducers({
  auth: authProcess,
  loadingState: loadingProcess,

  // auth: namaReducer,
});
