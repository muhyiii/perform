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
    dispatch({ type: "Loading" });
    try {
      const response = await register(payload);
      const data = response.data;
      // console.log(data);
      localStorage.setItem("id", data.data);
      dispatch({
        type: "LoadingStop",
      });
      return data;
    } catch (err) {
      // console.log(err);
      dispatch({
        type: "LoadingStop",
      });
    }
  };
}
export function functionRegisterBiodata(payload) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    // console.log(payload);
    try {
      const response = await registerBiodata(payload);
      // console.log(response);
      const data = response.data;
      localStorage.setItem("token", data.token);
      dispatch({
        type: "LoadingStop",
      });
      return data;
    } catch (err) {
      // console.log(err.response);
      dispatch({
        type: "LoadingStop",
      });
    }
  };
}

export function functionLogin(payload) {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await login(payload);
      const data = response.data;
      dispatch(loginHandle(data));
      localStorage.setItem("token", data.token);
      dispatch({
        type: "LoadingStop",
      });
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      // console.log(err.response);
      let data = err.response.data;
      return data;
    }
  };
}

export function authMe() {
  return async (dispatch) => {
    dispatch(isloadingStart());
    syncToken();
    try {
      const response = await getAuth();
      const data = response?.data;

      dispatch(loginHandle(data));
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
    dispatch({ type: "Loading" });
    try {
      const response = await getUser(id);
      // console.log(id);
      // console.log(response);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      // dispatch(dataHandle(data));
      // console.log(data);
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      // console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}
export function functionGetUsers() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getUsers();
      // console.log();
      // console.log(response.data);
      const data = response.data;
      dispatch({
        type: "LoadingStop",
      });
      // dispatch(dataHandle(data));
      // console.log(data);
      return data;
    } catch (err) {
      dispatch({
        type: "LoadingStop",
      });
      // console.log(err);
      let data = err.response.data;
      return data;
    }
  };
}
export function functionGetStaticUsers() {
  return async (dispatch) => {
    dispatch({ type: "Loading" });
    try {
      const response = await getStaticAll();
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

const isloadingStart = () => {
  return {
    type: "loadingStart",
  };
};

const registerHandle = (data) => {
  return {
    type: "Login",
    name: data?.name,
    username: data?.username,
    token: data?.token,
  };
};

const loginHandle = (data) => {
  return {
    type: "Login",
    name: data?.user?.name,
    username: data?.user?.username,
    token: data?.token,
  };
};

const dataHandle = (data) => {
  console.log(data?.data?.name);
  return {
    type: "GetUser",
    name: data?.data?.name,
    username: data?.data?.username,
    role: data?.data?.role,
    position: data?.data?.position,
  };
};
