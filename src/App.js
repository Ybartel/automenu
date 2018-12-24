import React, { Component } from 'react';
import './App.css';
import Ingredient from './model/Ingredient';
import MealGroup from './model/MealGroup';

const itemsKey = {
    ingredients: 'ingredients',
    mealGroups: 'meal_groups',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.loadIngredients(),
            mealGroups: this.loadMealGroups(),
            newIngredientName: '',
            newIngredientUnit: '',
            newMealGroupName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.addNewIngredient = this.addNewIngredient.bind(this);
        this.addNewMealGroup = this.addNewMealGroup.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addNewIngredient(event) {
        this.addIngredient(new Ingredient(this.state.newIngredientName, this.state.newIngredientUnit));
        this.render();
    }

    addNewMealGroup() {
        this.addMealGroup(new MealGroup(this.state.newMealGroupName));
    }

  render() {
      var listIngredients;
      var listMealGroups;
      if (this.state.ingredients !== "") {
          listIngredients = this.state.ingredients.map((ingredient) =>
              <li>{ingredient.ingredientName} ({ingredient.unit})</li>
          );
          listMealGroups = this.state.mealGroups.map((group) => <li>{group.groupName}</li>);
      }
    return (
      <div className="App">
          <p>
              On va commencer par se charger de la gestion des ingrédients.
              Un ingrédient est composé d'un nom et d'une unité de mesure
          </p>
          <ul>{listIngredients}</ul>
          <form onSubmit={this.addNewIngredient}>
              <label>
                  Nom:
                  <input type="text" name="newIngredientName" value={this.state.newIngredientName} onChange={this.handleChange} />
              </label>
              <label>
                  Unité de mesure :
                  <input type="text" name="newIngredientUnit"  value={this.state.newIngredientUnit} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
          <p>
              Maintenant il est temps de créer un plat. Pour commencer il nous faut définir un groupe de plats.
              Par exemple "Steak haché + Accompagnement" est un groupe de plats.
          </p>
          <ul>{listMealGroups}</ul>
          <form onSubmit={this.addNewMealGroup}>
              <label>
                  Nom:
                  <input
                      type="text"
                      name="newMealGroupName"
                      value={this.state.newMealGroupName}
                      onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }

  loadIngredients(): [Ingredient] {
    if (localStorage.getItem(itemsKey.ingredients) === null) {
        return [];
    }
    let value = localStorage.getItem(itemsKey.ingredients);
    try {
        value = JSON.parse(value);
        return value;
    } catch (e) {
        return [];
    }
  }

  saveIngredients() {
      let ingredientsJson = JSON.stringify(this.state.ingredients);
      localStorage.setItem(itemsKey.ingredients, ingredientsJson);
  }

  addIngredient(ingredient) {
      this.state.ingredients.push(ingredient);
      this.saveIngredients();
  }

    loadMealGroups(): [MealGroup] {
        if (localStorage.getItem(itemsKey.mealGroups) === null) {
            return [];
        }
        let value = localStorage.getItem(itemsKey.mealGroups);
        try {
            value = JSON.parse(value);
            return value;
        } catch (e) {
            return [];
        }
    }

    saveMealGroups() {
        let json = JSON.stringify(this.state.mealGroups);
        localStorage.setItem(itemsKey.mealGroups, json);
    }

    addMealGroup(mealGroup) {
      this.state.mealGroups.push(mealGroup);
      this.saveMealGroups();
    }
}

export default App;
