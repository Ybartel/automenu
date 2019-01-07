const initialState = {
  ingredients: [],
  mealGroups: [],
  selectedMealGroup: null
};

function manage(state = initialState, action) {
  if (_match(action.type, "MEAL_GROUP")) {
    return _manageMealGroups(state, action);
  } else if (_match(action.type, "SELECTED_GROUP")) {
    return _manageSelectedMealGroup(state, action);
  } else if (_match(action.type, "MEAL")) {
    return _manageMeals(state, action);
  } else if (_match(action.type, "INGREDIENT")) {
    return _manageIngredients(state, action);
  } else if (_match(action.type, "GLOBAL_STATE")) {
    return _manageGlobalState(state, action);
  } else {
    return state;
  }
}

function _match(type, pattern) {
  let fullPattern = "_" + pattern + "(S?)$";
  return type.match(new RegExp(fullPattern, "g"));
}

function _manageMealGroups(state = initialState, action) {
  switch (action.type) {
    case "ADD_MEAL_GROUP":
      return {
        ...state,
        mealGroups: [...state.mealGroups, action.value]
      };
    case "REMOVE_MEAL_GROUP":
      return {
        ...state,
        mealGroups: state.mealGroups.filter(item => item !== action.value)
      };
    case "IMPORT_MEAL_GROUPS":
      try {
        let value = JSON.parse(action.value);
        return {
          ...state,
          mealGroups: value
        };
      } catch (e) {
        console.log(e);
        return state;
      }
    default:
      return state;
  }
}

function _manageSelectedMealGroup(state = initialState, action) {
  switch (action.type) {
    case "SET_SELECTED_GROUP":
      return {
        ...state,
        selectedMealGroup: action.value
      };
    default:
      return state;
  }
}

function _manageMeals(state = initialState, action) {
  let mealGroups = [...state.mealGroups];
  let i = mealGroups.indexOf(state.selectedMealGroup);
  switch (action.type) {
    case "ADD_MEAL":
      mealGroups[i].meals = [...mealGroups[i].meals, action.value];
      return {
        ...state,
        mealGroups: mealGroups
      };
    case "REMOVE_MEAL":
      mealGroups[i].meals = mealGroups[i].meals.filter(
        item => item !== action.value
      );
      return {
        ...state,
        mealGroups: mealGroups
      };
    default:
      return state;
  }
}

function _manageIngredients(state = initialState, action) {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return (
        {
          ...state,
          ingredients: [...state.ingredients, action.value]
        } || state
      );
    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item !== action.value)
      };
    case "IMPORT_INGREDIENTS":
      try {
        let value = JSON.parse(action.value);
        return {
          ...state,
          ingredients: value
        };
      } catch (e) {
        console.log(e);
        return state;
      }
    default:
      return state;
  }
}

function _manageGlobalState(state = initialState, action) {
  switch (action.type) {
    case "IMPORT_GLOBAL_STATE":
      try {
        return JSON.parse(action.value);
      } catch (e) {
        console.log(e);
        return state;
      }
    default:
      return state;
  }
}

export default manage;
