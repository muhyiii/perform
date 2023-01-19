import { addPeriod, getAllPeriods } from "../../Functions/API";

export function functionAddPeriod(payload) {
  return async (dispatch) => {
    // dispatch({ type: "Loading" });
    try {
      const response = await addPeriod(payload);
      const data = response.data;

      return data;
    } catch (err) {
      console.log(err.response);
      let data = err.response?.data;
      return data;
    }
  };
}
export function functionGetPeriods() {
  return async (dispatch) => {
    // dispatch({ type: "Loading" });
    try {
      const response = await getAllPeriods();
      const data = response.data;

      return data;
    } catch (err) {
      console.log(err.response);
      let data = err.response.data;
      return data;
    }
  };
}
