const initialState = {
  goals: [],
  isAll: false,
  isRow: true,
};
function GOALS_REDUCER(state = initialState, action) {
  if (action.type === "CHANGE_ALL_GOAL") {
    return {
      ...state,
      isAll: !state.isAll,
    };
  }
  if (action.type === "CHANGE_ROW_GOAL") {
    return {
      ...state,
      isRow: !state.isRow,
    };
  }
  if (action.type === "GET_GOALS") {
    return {
      ...state,
      goals: action.goals,
    };
  }

  return state;
}
export default GOALS_REDUCER;
