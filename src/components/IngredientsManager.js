import React from "react";
import Ingredient from "../model/Ingredient";
import SimpleCard from "../components/SimpleCard";

const itemsKey = {
  ingredients: "ingredients"
};

class IngredientsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: IngredientsManager.loadIngredients(),
      newIngredientName: "",
      newIngredientUnit: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
  }

  addNewIngredient() {
    this.addIngredient(
      new Ingredient(this.state.newIngredientName, this.state.newIngredientUnit)
    );
    this.render();
  }

  render(): React.ReactNode {
    let listIngredients;
    if (this.state.ingredients !== "") {
      listIngredients = this.state.ingredients.map((ingredient, index) => (
        <li>
          {ingredient.ingredientName} ({ingredient.unit})
          <button onClick={() => this.handleRemoveIngredient(index)}>
            Delete
          </button>
        </li>
      ));
    }
    return (
      <div>
        <SimpleCard>
          On va commencer par se charger de la gestion des ingrédients. Un
          ingrédient est composé d'un nom et d'une unité de mesure
        </SimpleCard>
        <ul>{listIngredients}</ul>
        <form onSubmit={this.addNewIngredient} class="form-inline">
          <input
            class="form-control mr-2"
            type="text"
            name="newIngredientName"
            placeholder="Nom"
            value={this.state.newIngredientName}
            onChange={this.handleChange}
          />
          <input
            class="form-control mr-2"
            type="text"
            name="newIngredientUnit"
            placeholder="Unité de mesure :"
            value={this.state.newIngredientUnit}
            onChange={this.handleChange}
          />
          <button class="btn btn-primary" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    );
  }

  addIngredient(ingredient) {
    this.state.ingredients.push(ingredient);
    this.saveIngredients();
  }

  removeIngredient(index) {
    this.state.ingredients.splice(index, 1);
    this.saveIngredients();
  }

  static loadIngredients(): [Ingredient] {
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

  handleRemoveIngredient(index) {
    this.removeIngredient(index);
    window.location.reload();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
}

export default IngredientsManager;
