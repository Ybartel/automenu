import React, { Component } from 'react';
import './App.css';
import Ingredient from './model/Ingredient';

const itemsKey = {
    ingredients: 'ingredients',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.loadIngredients(),
            newIngredientName: '',
            newIngredientUnit: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.addNewIngredient = this.addNewIngredient.bind(this);
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

  render() {
      var listIngredients;
      if (this.state.ingredients !== "") {
          listIngredients = this.state.ingredients.map((ingredient) =>
              <li>{ingredient.ingredientName} ({ingredient.unit})</li>
          );
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
      </div>
    );
  }

  loadIngredients(): [Ingredient] {
    if (localStorage.getItem(itemsKey.ingredients) === null) {
        this.saveIngredients([]);
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
}

export default App;
