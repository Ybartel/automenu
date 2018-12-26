import React, { Component } from "react";
import "./App.css";
import IngredientsManager from "./components/IngredientsManager";
import MealGroupsManager from "./components/MealGroupsManager";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
              <IngredientsManager />
            </div>
            <div class="col-6">
              <MealGroupsManager />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
