import React from "react";
import PropTypes from "prop-types";
import Meal from "../model/Meal";

export default class MealNutritionalInfo extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="row mt-2">
        <div className="col-8">{this.props.infoText}</div>
        <div className="col-4">
          <input class="form-control" />
        </div>
      </div>
    );
  }
}

MealNutritionalInfo.propTypes = {
  infoText: PropTypes.string.isRequired,
  meal: PropTypes.instanceOf(Meal).isRequired,
  property: PropTypes.oneOf(["calories", "proteines", "carbs", "fat"])
    .isRequired
};
