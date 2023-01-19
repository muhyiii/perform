const initialState = {
  id: "",
  name: "",
  username: "",
  role: "",
  position: "",
  image: "",
};
function AUTH_REDUCER(state = initialState, action) {
  if (action.type === "GET_USER_NOW") {
    return {
      ...state,
      id: action.id,
      name: action.name,
      username: action.username,
      role: action.role,
      position: action.position,
      image: action.image,
      //   isAuth: true,
    };
  }
  if (action.type === "LOGOUT_USER") {
    return {
      ...state,
      id: null,
      name: "",
      username: "",
      role: "",
      position: "",
      token: "",
      image: "",
      isAuth: false,
    };
  }

  return state;
}
export default AUTH_REDUCER;
