import React from "react";
import ModalCustom from "./ModalCustom";

class ModalExport extends React.Component {
  render(): React.ReactNode {
    return (
      <ModalCustom
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
      >
        <textarea cols="100" rows="20" class="form-control">
          {this.props.content}
        </textarea>
      </ModalCustom>
    );
  }
}

export default ModalExport;
