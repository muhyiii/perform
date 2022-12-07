import { addPeriod, getAllPeriods } from "../../Functions/api";

export function functionAddPeriod(payload) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await addPeriod(payload);
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
export function functionGetPeriods() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getAllPeriods();
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
