import React from "react";
import Ingredient from "../model/Ingredient";
import SimpleCard from "./SimpleCard";
import TableLineWithDelete from "./TableLineWithDelete";
import ModalExport from "./ModalExport";
import { connect } from "react-redux";

class IngredientsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExportModalOpen: false,
      exportedJson: "",
      newIngredientName: "",
      newIngredientUnit: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
    this.openExportModal = this.openExportModal.bind(this);
  }

  addNewIngredient() {
    const action = {
      type: "ADD_INGREDIENT",
      value: new Ingredient(
        this.state.newIngredientName,
        this.state.newIngredientUnit
      )
    };
    this.props.dispatch(action);
  }

  removeIngredient(ingredient) {
    const action = { type: "REMOVE_INGREDIENT", value: ingredient };
    this.props.dispatch(action);
  }

  render(): React.ReactNode {
    let listIngredients;
    listIngredients = this.props.ingredients.map(ingredient => (
      <TableLineWithDelete
        onDeleteClick={() => this.removeIngredient(ingredient)}
      >
        {ingredient.ingredientName} ({ingredient.unit})
      </TableLineWithDelete>
    ));
    return (
      <div>
        <ModalExport
          isOpen={this.state.isExportModalOpen}
          onRequestClose={() => {
            this.setState({ isExportModalOpen: false });
          }}
          content={this.state.exportedJson}
        />
        <SimpleCard>
          On va commencer par se charger de la gestion des ingrédients. Un
          ingrédient est composé d'un nom et d'une unité de mesure
        </SimpleCard>
        <table class="table">{listIngredients}</table>
        <div class="form-inline">
          <input
            class="form-control mr-2"
            type="text"
            name="newIngredientName"
            placeholder="Nom"
            value={this.state.newIngredientName}
            onChange={this.handleChange}
          />
          <input
            class="form-control mr-2"
            type="text"
            name="newIngredientUnit"
            placeholder="Unité de mesure :"
            value={this.state.newIngredientUnit}
            onChange={this.handleChange}
          />
          <button onClick={this.addNewIngredient} class="btn btn-primary mr-2">
            Ajouter
          </button>
          <button className="btn btn-primary" onClick={this.openExportModal}>
            Exporter
          </button>
        </div>
      </div>
    );
  }

  openExportModal() {
    this.setState({
      exportedJson: JSON.stringify(this.props.ingredients),
      isExportModalOpen: true
    });
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
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(IngredientsManager);
