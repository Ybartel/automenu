import React from "react";
import SimpleCard from "./SimpleCard";
import { connect } from "react-redux";
import MealsManager from "./MealsManager";

class SelectedMealGroupManager extends React.Component {
  render(): React.ReactNode {
    if (this.props.selectedMealGroup == null) {
      return (
        <div>
          <SimpleCard>Aucun groupe de plats selectionné</SimpleCard>
        </div>
      );
    } else {
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
            <div className="col-6">
              <SimpleCard>Contenu du repas</SimpleCard>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    selectedMealGroup: state.selectedMealGroup
  };
};

export default connect(mapStateToProps)(SelectedMealGroupManager);
