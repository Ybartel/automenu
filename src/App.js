import React, { Component } from "react";
import "./App.css";
import MealGroup from "./model/MealGroup";
import SimpleCard from "./components/SimpleCard";
import IngredientsManager from "./components/IngredientsManager";

const itemsKey = {
  mealGroups: "meal_groups"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealGroups: this.loadMealGroups(),
      newMealGroupName: ""
    };
    this.handleChange = this.handleChange.bind(this);
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

  addNewMealGroup() {
    this.addMealGroup(new MealGroup(this.state.newMealGroupName));
  }

  handleRemoveMealGroup(index) {
    this.removeMealGroup(index);
    window.location.reload();
  }

  render() {
    var listMealGroups;
    if (this.state.mealGroups !== "") {
      listMealGroups = this.state.mealGroups.map((group, index) => (
        <li>
          {group.groupName}
          <button onClick={() => this.handleRemoveMealGroup(index)}>
            Delete
          </button>
        </li>
      ));
    }
    return (
      <div className="App">
        <IngredientsManager />
        <SimpleCard>
          Maintenant il est temps de créer un plat. Pour commencer il nous faut
          définir un groupe de plats. Par exemple "Steak haché + Accompagnement"
          est un groupe de plats.
        </SimpleCard>
        <ul>{listMealGroups}</ul>
        <form onSubmit={this.addNewMealGroup}>
          <label>
            Nom:
            <input
              type="text"
              name="newMealGroupName"
              value={this.state.newMealGroupName}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
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

  removeMealGroup(index) {
    this.state.mealGroups.splice(index, 1);
    this.saveMealGroups();
  }
}

export default App;
