import axios from "axios";
import Swal from "sweetalert2";

export const api = "http://localhost:2200";
const headers = {
  Accept: "application/json",
};
const axiosClient = axios.create({
  baseURL: api,
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  headers,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("err axios", error);
    // Swal.fire({
    //   icon: "error",
    //   title: "Oops...",
    //   text: "Something went wrong!",
    //   footer: window.location.reload(),
    // });
    if (401 === error?.response?.status) {
      localStorage.removeItem("token");

      clearToken();
      localStorage.clear();
      window.location.replace("/login");
      // } else if (error) {
      //   localStorage.removeItem("token");
      //   console.log("error");
      //   clearToken();
      //   localStorage.clear();
      //   window.location.replace("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

export const syncToken = () => {
  axiosClient.defaults.headers[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
};

export const clearToken = () => {
  delete axiosClient.defaults.headers["token"];
};
export default axiosClient;
