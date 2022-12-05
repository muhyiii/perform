import {
  addMeasuredActivity,
  deleteMeasuredActivityById,
  deleteMultiMeasuredActivity,
  getMeasuredActivities,
  getMeasuredActivitiesByGoalId,
  getMeasuredActivitiesByUserNow,
  getMeasuredActivityById,
  updateMeasuredActivityById,
  updateMultiMeasuredActivity,
} from "../../Functions/api";

export function functionGetMeasuredActivities() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getMeasuredActivities();
      // console.log(response);
      const data = response.data;

      dispatch({
        type: "LoadingStop",
      });
      // console.log(data);
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

export function functionGetMeasuredActivityById(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getMeasuredActivityById(id);
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

export function functionDeleteMeasuredActivity(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await deleteMeasuredActivityById(id);
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

export function functionUpdateMeasuredActivity(id, status, archive) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      // console.log(status);
      const response = await updateMeasuredActivityById(id, status, archive);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      console.log(id, status);
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}

export function functionUpdateMultiMeasuredActivity(multiId, value, archive) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await updateMultiMeasuredActivity(
        multiId,
        value,
        archive
      );
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}
export function functionDeleteMultiMeasuredActivity(multiId) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await deleteMultiMeasuredActivity(multiId);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}
