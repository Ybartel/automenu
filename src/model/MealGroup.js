import Meal from "./Meal";

class MealGroup {
  constructor(groupName) {
    this.groupName = groupName;
    this.meals = [];
  }

  createMeal(mealName, calories, proteines, carbs, fat) {
    this.meals.push(new Meal(mealName, calories, proteines, carbs, fat));
  }
}

export default MealGroup;
