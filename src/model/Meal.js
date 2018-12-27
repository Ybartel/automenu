class Meal {
  constructor(mealName, calories, proteines, carbs, fat) {
    this.mealName = mealName;
    this.calories = calories;
    this.proteines = proteines;
    this.carbs = carbs;
    this.fat = fat;
    this.ingredients = [];
  }
}

export default Meal;
