import axios from "axios";
import axioss from "./axiosClient";

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
    `/register-account/continue/${localStorage.getItem("id")}`,
    values
  );
}
//// GET TOKEN
export function getAuth() {
  return axioss.get("/get-token");
}
//// GET USERS ALL
export function getUsers() {
  return axioss.get("/data/users");
}
//// GET THIS USER
export function getUser(id) {
  return axioss.get(`/data/users/${id}`);
  //   console.log("dataUsers", users.data.data);
}

// GOALS
//// ADD GOAL
export function addGoal(values) {
  return axioss.post("/add-goal", values);
}
//// GET GOALS ALL
export function getGoals() {
  return axioss.get("/data/goals");
}
//// GET GOALS ALL BY USER NOW
export function getGoalsByUserNow(id) {
  return axioss.get(`/data/goals/user/${id}`);
}
//// GET GOAL BY ID
export function getGoalById(userId) {
  return axioss.get(`/data/goals/${userId}`);
}
//// DELETE GOAL BY ID
export function deleteGoalById(goalId) {
  return axioss.delete(`/data/goals/${goalId}/delete`);
}
//// UPDATE GOAL BY ID
export function updateGoalById(goalId, payload) {
  return axioss.put(`/data/goals/${goalId}/update`, { status: payload });
}

//// MEASURED ACTIVITY
//// ADD MEASURED ACTIVITY
export function addMeasuredActivity(payload) {
  return axioss.post("add-measured-activity", payload);
}
//// GET ALL MEASURED ACTIVITIES
export function getMeasuredActivities() {
  return axioss.get("/data/measured-activities");
}
//// GET MEASURED ACTIVITIES ALL BY USER NOW
export function getMeasuredActivitiesByUserNow(id) {
  return axioss.get(`/data/measured-activities/user/${id}`);
}
//// GET MEASURED ACTIVITY BY GOAL ID
export function getMeasuredActivitiesByGoalId(id) {
  return axioss.get(`/data/measured-activities/goal/${id}`);
}
//// GET MEASURED ACTIVITIES ALL BY USER NOW
export function getMeasuredActivityById(id) {
  return axioss.get(`/data/measured-activities/${id}`);
}
