import React from "react";
import SimpleCard from "./SimpleCard";
import { connect } from "react-redux";

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
          <SimpleCard>
            "{this.props.selectedMealGroup.groupName}" selectionné
          </SimpleCard>
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
