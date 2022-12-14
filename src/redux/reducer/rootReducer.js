const initialState = {
  token: "",
  isAllGoal: false,
  isRow: true,
  isAllMa: false,
  isLoading: false,
};

export const rootReducer = (state = initialState, action) => {
  if (action.type === "CHANGE_ALL_GOAL") {
    return {
      ...state,
      isAllGoal: !state.isAllGoal,
    };
  }
  if (action.type === "CHANGE_ROW_GOAL") {
    return {
      ...state,
      isRow: !state.isRow,
    };
  }
  if (action.type === "CHANGE_ALL_MA") {
    return {
      ...state,
      isAllMa: !state.isAllMa,
    };
  }

  return state;
};

export default rootReducer;
// export function authProcess(state = initialState, action) {
//   if (action.type === "Login") {
//     return {
//       ...state,
//       token: action.token,
//       isAuth: true,
//     };
//   }
//   if (action.type === "GetUser") {
//     return {
//       ...state,
//       id: action.id,
//       name: action.name,
//       username: action.username,
//       role: action.role,
//       position: action.position,
//       isAuth: true,
//     };
//   }
//   if (action.type === "Logout") {
//     return {
//       ...state,
//       id: null,
//       name: "",
//       username: "",
//       role: "",
//       position: "",
//       token: "",
//       isAuth: false,
//     };
//   }
//   if (action.type === "Loading") {
//     return {
//       ...state,
//       isLoading: true,
//     };
//   }
//   if (action.type === "LoadingStop") {
//     return {
//       ...state,
//       isLoading: false,
//     };
//   }

//   return state;
// }
// const loadingState = {
//   isLoading: false,
// };
// export function loadingProcess(load = loadingState, act) {
//   if (act.type === "Loading") {
//     return {
//       ...load,
//       isLoading: true,
//     };
//   }
//   if (act.type === "LoadingStop") {
//     return {
//       ...load,
//       isLoading: false,
//     };
//   }
//   return load;
// }
