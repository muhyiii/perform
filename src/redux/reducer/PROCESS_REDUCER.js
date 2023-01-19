const initialState = {
  isAuth: false,
  isLoading: false,
  isAlert: false,
  token: "",
};

function PROCESS_REDUCER(state = initialState, action) {
  if (action.type === "MAKE_ALERT") {
    return {
      ...state,
      isAlert: true,
    };
  }
  if (action.type === "STOP_ALERT") {
    return {
      ...state,
      isAlert: false,
    };
  }
  if (action.type === "MAKE_LOADING") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "STOP_LOADING") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "LOGIN_PROCESS") {
    return {
      ...state,
      isAuth: true,
      token: action.token,
    };
  }
  return state;
}
module.exports = PROCESS_REDUCER;
