import { getGoalById, getGoals } from "../../Functions/api";

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
