const initialState = {
  ingredients: [],
  mealGroups: [],
  selectedMealGroup: null
};

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
    case "SET_SELECTED_MEAL_GROUP":
      nextState = {
        ...state,
        selectedMealGroup: action.value
      };
      return nextState;
    case "ADD_MEAL":
      let mealGroups = [...state.mealGroups];
      let i = mealGroups.indexOf(state.selectedMealGroup);
      mealGroups[i].meals = [...mealGroups[i].meals, action.value];
      nextState = {
        ...state,
        mealGroups: mealGroups
      };
      return nextState;
    case "REMOVE_MEAL":
      nextState = {
        ...state,
        mealGroups: _removeMealFromGroup(
          [...state.mealGroups],
          state.selectedMealGroup,
          action.value
        )
      };
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
    case "IMPORT_INGREDIENTS":
      try {
        let value = JSON.parse(action.value);
        nextState = {
          ...state,
          ingredients: value
        };
      } catch (e) {
        console.log(e);
        return state;
      }
      return nextState;
    default:
      return state;
  }
}

function _removeMealFromGroup(mealGroups, selectedMealGroup, meal) {
  let i = mealGroups.indexOf(selectedMealGroup);
  mealGroups[i].meals = mealGroups[i].meals.filter(item => item !== meal);
  return mealGroups;
}

export default manage;
