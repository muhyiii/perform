import {
  getStaticAll,
  getUser,
  getUsers,
  login,
  register,
  registerBiodata,
} from "../../Functions/API";

export function FUNCTION_REGISTER(payload) {
  return async (dispatch) => {
    dispatch({ type: "MAKE_LOADING" });
    try {
      const response = await register(payload);
      const data = response.data;

      localStorage.setItem("id", data.data);
      return data;
    } catch (err) {
      // console.log(err);
    }
  };
}
export function FUNCTION_REGISTER_BIODATA(payload) {
  return async (dispatch) => {
    dispatch({ type: "MAKE_LOADING" });
    try {
      const response = await registerBiodata(payload);
      const data = response.data;
      localStorage.setItem("token", data.token);
      dispatch({ type: "STOP_LOADING" });
      return data;
    } catch (err) {
      dispatch({ type: "STOP_LOADING" });
    }
  };
}

export function FUNCTION_LOGIN(payload) {
  return async (dispatch) => {
    dispatch({ type: "MAKE_LOADING" });
    try {
      const response = await login(payload);
      const data = response.data;

      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN_PROCESS", token: data.token });
      dispatch({ type: "STOP_LOADING" });
      return data;
    } catch (err) {
      dispatch({ type: "STOP_LOADING" });
      let data = err.response.data;
      return data;
    }
  };
}

// export function authMe() {
//   return async (dispatch) => {
//     try {
//       const response = await getAuth();
//       const data = response?.data;

//       if (data.msg === "Success") {
//         localStorage.setItem("token", data?.token);
//       }

//       syncToken();
//       dispatch({
//         type: "loadingEnd",
//       });
//       return data;
//     } catch (err) {
//       // console.log(err);
//       // console.log("masuk sini");

//       dispatch({
//         type: "loadingEnd",
//       });

//       let data = err?.response?.data;
//       // console.log(err);
//       return data;
//     }
//   };
// }

export function FUNCTION_GET_USER_AFTER_LOGIN(id) {
  return async (dispatch) => {
    dispatch({ type: "MAKE_LOADING" });
    try {
      const response = await getUser(id);
      const data = response.data;

      dispatch({
        type: "GET_USER_NOW",
        id: data.data.id,
        name: data.data.name,
        role: data.data.role,
        position: data.data.position,
        image: data.data.image,
      });

      dispatch({ type: "STOP_LOADING" });
      return data;
    } catch (err) {
      dispatch({ type: "STOP_LOADING" });
      let data = err.response.data;
      return data;
    }
  };
}
export function FUNCTION_GET_USERS() {
  return async (dispatch) => {
    dispatch({ type: "MAKE_LOADING" });
    try {
      const response = await getUsers();
      const data = response.data;

      dispatch({ type: "STOP_LOADING" });
      return data;
    } catch (err) {
      dispatch({ type: "STOP_LOADING" });
      let data = err.response.data;
      return data;
    }
  };
}
export function FUNCTION_GET_STATIC_ALL_USERS() {
  return async (dispatch) => {
    dispatch({ type: "MAKE_LOADING" });
    try {
      const response = await getStaticAll();
      const data = response.data;

      dispatch({ type: "STOP_LOADING" });
      return data;
    } catch (err) {
      dispatch({ type: "STOP_LOADING" });
      let data = err.response.data;
      return data;
    }
  };
}
