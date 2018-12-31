const initialState = { ingredients: [], mealGroups: [] };

function manage(state = initialState, action) {
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
    case "IMPORT_MEAL_GROUPS":
      try {
        let value = JSON.parse(action.value);
        nextState = {
          ...state,
          mealGroups: value
        };
      } catch (e) {
        console.log(e);
        return state;
      }
      return nextState;
    case "ADD_INGREDIENT":
      nextState = {
        ...state,
        ingredients: [...state.ingredients, action.value]
      };
      return nextState || state;
    case "REMOVE_INGREDIENT":
      nextState = {
        ...state,
        ingredients: state.ingredients.filter(item => item !== action.value)
      };
      return nextState;
    default:
      return state;
  }
}

export default manage;
