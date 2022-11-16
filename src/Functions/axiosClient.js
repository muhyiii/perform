import axios from "axios";

const headers = {
  Accept: "application/json",
};
const axiosClient = axios.create({
  baseURL: "http://localhost:2200",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  headers,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("err axios", error);
    if (401 === error?.response?.status) {
      localStorage.removeItem("token");

      clearToken();
      localStorage.clear();
      window.location.replace("/login");
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
