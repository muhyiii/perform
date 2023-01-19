const initialState = {
    mas: [],
    isAll: false,
    // isRow: true,
  };
  function MA_REDUCER(state = initialState, action) {
    if (action.type === "CHANGE_ALL_MA") {
      return {
        ...state,
        isAll: !state.isAll,
      };
    }
    // if (action.type === "CHANGE_ROW_GOAL") {
    //   return {
    //     ...state,
    //     isRow: !state.isRow,
    //   };
    // }
    // if (action.type === "GetGoals") {
    //   return {
    //     ...state,
    //     goals: action.goals,
    //   };
    // }
  
    return state;
  }
  export default MA_REDUCER;
  