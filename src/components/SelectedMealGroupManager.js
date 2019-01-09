import React from "react";
import SimpleCard from "./SimpleCard";
import { connect } from "react-redux";
import MealsManager from "./MealsManager";
import SelectedMealManager from "./SelectedMealManager";

class SelectedMealGroupManager extends React.Component {
  render(): React.ReactNode {
    if (this.props.selectedMealGroup == null) {
      return (
        <div>
          <SimpleCard>Aucun groupe de plats selectionné</SimpleCard>
        </div>
      );
    } else {
      let selectedMealManager;
      if (this.props.selectedMeal != null) {
        selectedMealManager = (
          <div className="col-6">
            <SimpleCard>Contenu du repas sélectionné</SimpleCard>
            <SelectedMealManager />
          </div>
        );
      }
      return (
        <div>
          <div className="row">
            <div className="col-12">
              <SimpleCard>
                "{this.props.selectedMealGroup.groupName}" selectionné
              </SimpleCard>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <SimpleCard>Liste des Repas</SimpleCard>
              <MealsManager />
            </div>
            {selectedMealManager}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    selectedMealGroup: state.selectedMealGroup,
    selectedMeal: state.selectedMeal
  };
};

export default connect(mapStateToProps)(SelectedMealGroupManager);
