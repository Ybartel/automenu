import React from "react";
import { connect } from "react-redux";
import CustomTable from "./CustomTable";
import TableLineWithDelete from "./TableLineWithDelete";
import Meal from "../model/Meal";

class MealsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMealName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewMeal = this.addNewMeal.bind(this);
  }

  render(): React.ReactNode {
    let meals;
    if (this.props.selectedMealGroup.meals !== "") {
      meals = this.props.selectedMealGroup.meals.map(meal => (
        <TableLineWithDelete onDeleteClick={() => this.removeMeal(meal)}>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.selectMeal(meal)}
          >
            {meal.mealName}
          </button>
        </TableLineWithDelete>
      ));
    }
    return (
      <div>
        <CustomTable content={meals} />
        <div className="form-inline">
          <input
            className="form-control mr-2"
            type="text"
            name="newMealName"
            placeholder="Repas"
            value={this.state.newMealName}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary" onClick={this.addNewMeal}>
            Ajouter
          </button>
        </div>
      </div>
    );
  }

  addNewMeal() {
    const action = {
      type: "ADD_MEAL",
      value: new Meal(this.state.newMealName, 0, 0, 0, 0)
    };
    this.props.dispatch(action);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  removeMeal(meal) {
    const action = { type: "REMOVE_MEAL", value: meal };
    this.props.dispatch(action);
  }

  selectMeal(meal) {
    const action = { type: "SELECT_MEAL", value: meal };
    this.props.dispatch(action);
  }
}

const mapStateToProps = state => {
  return {
    selectedMealGroup: state.selectedMealGroup,
    mealGroups: state.mealGroups
  };
};

export default connect(mapStateToProps)(MealsManager);
