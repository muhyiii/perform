import { combineReducers } from "redux";
import GOALS_REDUCER from "./GOALS_REDUCER";
import AUTH_REDUCER from "./AUTH_REDUCER";
import MA_REDUCER from "./MA_REDUCER";
import PROCESS_REDUCER from "./PROCESS_REDUCER";

export const allReducers = combineReducers({
  GOALS_REDUCER,
  MA_REDUCER,
  AUTH_REDUCER,
  PROCESS_REDUCER,
});
