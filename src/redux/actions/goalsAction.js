import { getGoals } from "../../Functions/api";

export function functionGetGoals() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getGoals();
      const data = response.data;

      dispatch({
        type: "LoadingStop",
      });
      console.log(data);
      return data;
    } catch (err) {
      dispatch({
        type: "loadingEnd",
      });
      let data = err.response.data;
      return data;
    }
  };
}
