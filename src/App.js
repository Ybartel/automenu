import React, { Component } from "react";
import "./App.css";
import IngredientsManager from "./components/IngredientsManager";
import MealGroupsManager from "./components/MealGroupsManager";

class App extends Component {
  render() {
    return (
      <div className="App">
        <IngredientsManager />
        <MealGroupsManager />
      </div>
    );
  }
}

export default App;
