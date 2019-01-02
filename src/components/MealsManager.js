import React from "react";
import { connect } from "react-redux";
import TableLineWithDelete from "./TableLineWithDelete";

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
        <TableLineWithDelete>
          <button type="button" className="btn btn-link">
            {meal.mealName}
          </button>
        </TableLineWithDelete>
      ));
    }
    return (
      <div>
        <table className="table">{meals}</table>
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
    // TODO: Ajouter le repas dans la liste des repas du MealGroup
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

const mapStateToProps = state => {
  return {
    selectedMealGroup: state.selectedMealGroup
  };
};

export default connect(mapStateToProps)(MealsManager);
