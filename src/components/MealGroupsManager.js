import React from "react";
import MealGroup from "../model/MealGroup";
import SimpleCard from "../components/SimpleCard";
import CustomTable from "./CustomTable";
import TableLineWithDelete from "./TableLineWithDelete";
import ModalExport from "./ModalExport";
import ModalImport from "./ModalImport";
import { connect } from "react-redux";

class MealGroupsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExportModalOpen: false,
      isImportModalOpen: false,
      exportedJson: "",
      newMealGroupName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewMealGroup = this.addNewMealGroup.bind(this);
    this.openExportModal = this.openExportModal.bind(this);
    this.openImportModal = this.openImportModal.bind(this);
    this.onImportModalValidate = this.onImportModalValidate.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addNewMealGroup() {
    const action = {
      type: "ADD_MEAL_GROUP",
      value: new MealGroup(this.state.newMealGroupName)
    };
    this.props.dispatch(action);
  }

  render(): React.ReactNode {
    console.log(this.props);
    let listMealGroups;
    if (this.state.mealGroups !== "") {
      listMealGroups = this.props.mealGroups.map(mealGroup => (
        <TableLineWithDelete
          onDeleteClick={() => this.removeMealGroup(mealGroup)}
        >
          <button
            type="button"
            class="btn btn-link"
            onClick={() => this.selectMealGroup(mealGroup)}
          >
            {mealGroup.groupName} ({mealGroup.meals.length || 0} plats)
          </button>
        </TableLineWithDelete>
      ));
    }
    return (
      <div>
        <ModalExport
          isOpen={this.state.isExportModalOpen}
          onRequestClose={() => {
            this.setState({ isExportModalOpen: false });
          }}
          content={this.state.exportedJson}
        />
        <ModalImport
          isOpen={this.state.isImportModalOpen}
          onRequestClose={() => {
            this.setState({ isImportModalOpen: false });
          }}
          onValidate={this.onImportModalValidate}
        />
        <SimpleCard>
          Maintenant il est temps de créer un plat. Pour commencer il nous faut
          définir un groupe de plats. Par exemple "Steak haché + Accompagnement"
          est un groupe de plats.
        </SimpleCard>
        <CustomTable content={listMealGroups} />
        <div class="form-inline">
          <input
            class="form-control mr-2"
            type="text"
            name="newMealGroupName"
            placeholder="Nom"
            value={this.state.newMealGroupName}
            onChange={this.handleChange}
          />
          <button class="btn btn-primary mr-2" onClick={this.addNewMealGroup}>
            Ajouter
          </button>
          <button class="btn btn-primary mr-2" onClick={this.openExportModal}>
            Exporter
          </button>
          <button className="btn btn-primary" onClick={this.openImportModal}>
            Importer
          </button>
        </div>
      </div>
    );
  }

  openExportModal() {
    this.setState({
      exportedJson: JSON.stringify(this.props.mealGroups),
      isExportModalOpen: true
    });
  }

  openImportModal() {
    this.setState({ isImportModalOpen: true });
  }

  onImportModalValidate(data) {
    console.log("onImportModalValidate: " + data);
    const action = { type: "IMPORT_MEAL_GROUPS", value: data };
    this.props.dispatch(action);
    this.setState({ isImportModalOpen: false });
  }

  removeMealGroup(mealGroup) {
    const action = { type: "REMOVE_MEAL_GROUP", value: mealGroup };
    this.props.dispatch(action);
  }

  selectMealGroup(mealGroup) {
    const action = { type: "SET_SELECTED_GROUP", value: mealGroup };
    this.props.dispatch(action);
  }
}

const mapStateToProps = state => {
  return {
    mealGroups: state.mealGroups,
    selectedMealGroup: state.selectedMealGroup
  };
};

export default connect(mapStateToProps)(MealGroupsManager);
