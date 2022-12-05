import {
  addGoal,
  deleteGoalById,
  deleteMultiGoals,
  getGoalById,
  getGoals,
  getGoalsByUserNow,
  updateGoalById,
  updateMultiGoals,
} from "../../Functions/api";

export function functionGetGoals() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getGoals();
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
export function functionGetGoalsByUserNow(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getGoalsByUserNow(id);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
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

export function functionGetGoalsById(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getGoalById(id);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
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

export function functionAddGoal(payload) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await addGoal(payload);
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

export function functionDeleteGoal(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await deleteGoalById(id);
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
export function functionUpdateGoal(id, status, archive) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await updateGoalById(id, status, archive);
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
export function functionUpdateMultiGoals(multiId, value, archive) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await updateMultiGoals(multiId, value, archive);
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
export function functionDeleteMultiGoals(multiId) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await deleteMultiGoals(multiId);
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
