import React from "react";
import ModalCustom from "./ModalCustom";

class ModalImport extends React.Component {
  constructor(props) {
    super(props);
    this._validate = this._validate.bind(this);
  }

  render(): React.ReactNode {
    return (
      <ModalCustom
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <textarea
          cols="100"
          rows="20"
          class="form-control mb-2"
          ref={ref => (this.textarea = ref)}
        />
        <div class="form-inline" onClick={this._validate}>
          <button className="btn btn-primary mr-2">Valider</button>
        </div>
      </ModalCustom>
    );
  }

  _validate() {
    let data = this.textarea.value;
    this.props.onValidate(data);
  }
}

export default ModalImport;
