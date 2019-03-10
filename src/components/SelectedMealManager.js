import React from "react";
import { connect } from "react-redux";
import MealNutritionalInfo from "./MealNutritionalInfo";
import SimpleCard from "./SimpleCard";

class SelectedMealManager extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <SimpleCard>{this.props.selectedMeal.mealName}</SimpleCard>
        <MealNutritionalInfo
          infoText="Calories"
          meal={this.props.selectedMeal}
          property={"calories"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedMeal: state.selectedMeal
  };
};

export default connect(mapStateToProps)(SelectedMealManager);
