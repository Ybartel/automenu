const initialState = { mealGroups: [] };

function manageMealGroup(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_MEAL_GROUP":
      nextState = {
        ...state,
        mealGroups: [...state.mealGroups, action.value]
      };
      return nextState || state;
    case "REMOVE_MEAL_GROUP":
      nextState = {
        ...state,
        mealGroups: state.mealGroups.filter(item => item !== action.value)
      };
      return nextState;
    default:
      return state;
  }
}

export default manageMealGroup;
