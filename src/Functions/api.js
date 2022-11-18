import axios from "axios";
import axioss from "./axiosClient";

export const api = "http://localhost:2200";

// USERS
//// LOGIN
export function login(values) {
  return axioss.post("/login-account", values);
}
//// REGISTER
export function register(values) {
  return axioss.post("/register-account", values);
}
//// REGISTER BIODATA
export function registerBiodata(values) {
  return axioss.post(
    `/register-account/continue/${localStorage.getItem("id" )}`,
    values
  );
}
//// GET TOKEN    
export function getAuth() {
  return axioss.get("/get-token");
}
//// GET USERS ALL
export function getUser(id) {
  return axioss.get(`/data/users/${id}`);
  //   console.log("dataUsers", users.data.data);
}

// GOALS
//// GET GOALS ALL
export function getGoals() {
  return axioss.get("/data/goals");
}
//// GET GOAL BY ID
export const getGoalById = async (userId) => {
  return axioss.get(`/data/goals/${userId}`);
};
