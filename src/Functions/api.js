import axios from "./axiosClient";

export const api = "http://localhost:2200";

// USERS
//// LOGIN
export function login(values) {
  return axios.post("/login-account", values);
}
//// REGISTER
export function register(values) {
  return axios.post("/register-account", values);
}
//// GET TOKEN
export function getAuth() {
  return axios.get("/get-token");
}
//// GET USERS ALL
export function getUsers(id) {
  return axios.get(`/data/users/${id}`);
  //   console.log("dataUsers", users.data.data);
}

// GOALS
//// GET GOALS ALL
export function getGoals() {
  return axios.get("/data/goals");
}
//// GET GOAL BY ID
export const getGoalById = async (userId) => {
  const goal = await axios.get(api + `/data/goals/${userId}`);
  console.log("dataGoal", goal.data.data);
  return goal.data.data;
};
