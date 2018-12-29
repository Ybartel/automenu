import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import "./App.css";
import IngredientsManager from "./components/IngredientsManager";
import MealGroupsManager from "./components/MealGroupsManager";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <IngredientsManager />
              </div>
              <div className="col-6">
                <MealGroupsManager />
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
