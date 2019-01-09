import React from "react";
import { connect } from "react-redux";
import SimpleCard from "./SimpleCard";

class SelectedMealManager extends React.Component {
  render(): React.ReactNode {
    return <SimpleCard>{this.props.selectedMeal.mealName}</SimpleCard>;
  }
}

const mapStateToProps = state => {
  return {
    selectedMeal: state.selectedMeal
  };
};

export default connect(mapStateToProps)(SelectedMealManager);
