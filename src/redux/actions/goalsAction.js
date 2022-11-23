import jwtDecode from "jwt-decode";
import {
  addGoal,
  deleteGoalById,
  getGoalById,
  getGoals,
  getGoalsByUserNow,
  updateGoalById,
} from "../../Functions/api";

export function functionGetGoals() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getGoals();
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
export function functionGetGoalsByUserNow() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      var decoded = jwtDecode(localStorage.getItem("token"));
      console.log(decoded);
      const response = await getGoalsByUserNow(decoded.id);
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

export function functionGetGoalsById(id) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getGoalById(id);
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
export function functionUpdateGoal(id, status) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      // console.log(status);
      const response = await updateGoalById(id, status);
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
