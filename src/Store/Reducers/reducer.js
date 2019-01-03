const initialState = {
  ingredients: [],
  mealGroups: [],
  selectedMealGroup: null
};

function manage(state = initialState, action) {
  switch (action.type) {
    case "ADD_MEAL_GROUP":
    case "REMOVE_MEAL_GROUP":
    case "IMPORT_MEAL_GROUPS":
      return _manageMealGroups(state, action);
    case "SET_SELECTED_MEAL_GROUP":
      return _manageSelectedMealGroup(state, action);
    case "ADD_MEAL":
    case "REMOVE_MEAL":
      return _manageMeals(state, action);
    case "ADD_INGREDIENT":
    case "REMOVE_INGREDIENT":
    case "IMPORT_INGREDIENTS":
      return _manageIngredients(state, action);
    default:
      return state;
  }
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
    case "SET_SELECTED_MEAL_GROUP":
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

export default manage;
