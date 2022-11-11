import axios from "axios";

export const api = "http://localhost:2200";

// USERS
//// GET USERS ALL
export const getUsers = async () => {
  const users = await axios.get(api + "/data/users");
  //   console.log("dataUsers", users.data.data);
  return users.data.data;
};

// GOALS
//// GET GOALS ALL
export const getGoals = async () => {
  const goals = await axios.get(api + "/data/goals");
  //   console.log("dataUsers", goals.data.data);
  return goals.data.data;
};
//// GET GOAL BY ID
export const getGoalById = async (userId) => {
  const goal = await axios.get(api + `/data/goals/${userId}`);
  console.log('dataGoal',goal.data.data);
  return goal.data.data;
};
