import {
  addMeasuredActivity,
  getMeasuredActivities,
  getMeasuredActivitiesByGoalId,
  getMeasuredActivitiesByUserNow,
} from "../../Functions/api";

export function functionGetMeasuredActivities() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getMeasuredActivities();
      console.log(response);
      const data = response.data;

      dispatch({
        type: "LoadingStop",
      });
      console.log(data);
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      let data = err.response.data;
      return data;
    }
  };
}
export function functionGetMeasuredActivityByUserNow(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getMeasuredActivitiesByUserNow(id);
      console.log(response);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      console.log(data);
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      let data = err.response.data;
      return data;
    }
  };
}

export function functionAddMeasuredActivity(payload) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await addMeasuredActivity(payload);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      console.log(err.response);
      let data = err.response.data;
      return data;
    }
  };
}

export function functionGetMeasuredActivityByGoalId(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getMeasuredActivitiesByGoalId(id);
      console.log(response);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      console.log(data);
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      let data = err.response.data;
      return data;
    }
  };
}