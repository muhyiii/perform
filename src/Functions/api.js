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
//// GET ALL STATIC USERS
export function getStaticAll() {
  return axioss.get(`/data/users/staticAll`);
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
export function updateGoalById(goalId, payload, archive) {
  return axioss.put(`/data/goals/${goalId}/update`, {
    status: payload,
    isArchive: archive,
  });
}
//// UPDATE MULTI GOALS
export function updateMultiGoals(multiId, value, archive) {
  return axioss.post(`/data/goals/multiple/update`, {
    goalId: multiId,
    status: value,
    isArchive: archive,
  });
} //// UPDATE MULTI GOALS
export function deleteMultiGoals(multiId) {
  return axioss.post(`/data/goals/multiple/delete`, {
    multiId: multiId,
  });
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
//// DELETE MEASURED ACTIVITY BY ID
export function deleteMeasuredActivityById(maId) {
  return axioss.delete(`/data/measured-activities/${maId}/delete`);
}
//// UPDATE MEASURED ACTIVITY BY ID
export function updateMeasuredActivityById(maId, payload, archive) {
  return axioss.put(`/data/measured-activities/${maId}/update`, {
    status: payload,
    isArchive: archive,
  });
}
//// UPDATE MULTI MEASURED ACTIVITIES
export function updateMultiMeasuredActivity(multiId, value, archive) {
  return axioss.post(`/data/measured-activities/multiple/update`, {
    maId: multiId,
    status: value,
    isArchive: archive,
  });
} //// UPDATE MULTI MEASURED ACTIVITIES
export function deleteMultiMeasuredActivity(multiId) {
  return axioss.post(`/data/measured-activities/multiple/delete`, {
    multiId: multiId,
  });
}
