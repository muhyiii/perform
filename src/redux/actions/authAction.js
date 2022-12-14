import {
  getAuth,
  getStaticAll,
  getUser,
  getUsers,
  login,
  register,
  registerBiodata,
} from "../../Functions/api";
import { syncToken } from "../../Functions/axiosClient";
import jwt_decode from "jwt-decode";
export function functionRegister(payload) {
  return async (dispatch) => {
    try {
      const response = await register(payload);
      const data = response.data;
      // console.log(data);
      localStorage.setItem("id", data.data);

      return data;
    } catch (err) {
      // console.log(err);
    }
  };
}
export function functionRegisterBiodata(payload) {
  return async (dispatch) => {
    // console.log(payload);
    try {
      const response = await registerBiodata(payload);
      // console.log(response);
      const data = response.data;
      localStorage.setItem("token", data.token);

      return data;
    } catch (err) {
      // console.log(err.response);
    }
  };
}

export function functionLogin(payload) {
  return async (dispatch) => {
    try {
      const response = await login(payload);
      const data = response.data;

      localStorage.setItem("token", data.token);

      return data;
    } catch (err) {
      // console.log(err.response);
      let data = err.response.data;
      return data;
    }
  };
}

export function authMe() {
  return async (dispatch) => {
    try {
      const response = await getAuth();
      const data = response?.data;

      if (data.msg === "Success") {
        localStorage.setItem("token", data?.token);
      }

      syncToken();
      dispatch({
        type: "loadingEnd",
      });
      return data;
    } catch (err) {
      // console.log(err);
      // console.log("masuk sini");

      dispatch({
        type: "loadingEnd",
      });

      let data = err?.response?.data;
      // console.log(err);
      return data;
    }
  };
}

export function functionGetUserAfterLogin(id) {
  return async (dispatch) => {
    try {
      const response = await getUser(id);
      // console.log(id);
      // console.log(response);
      const data = response.data;

      // dispatch(dataHandle(data));
      // console.log(data);
      return data;
    } catch (err) {
      // console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}
export function functionGetUsers() {
  return async (dispatch) => {
    try {
      const response = await getUsers();
      // console.log();
      // console.log(response.data);
      const data = response.data;

      // dispatch(dataHandle(data));
      // console.log(data);
      return data;
    } catch (err) {
      // console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}
export function functionGetStaticUsers() {
  return async (dispatch) => {
    try {
      const response = await getStaticAll();
      const data = response.data;

      return data;
    } catch (err) {
      let data = err.response.data;
      return data;
    }
  };
}
