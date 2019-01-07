import React from "react";
import { connect } from "react-redux";
import ModalImport from "./ModalImport";

class GlobalStateManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImportModalOpen: false
    };

    this._onImportModalValidate = this._onImportModalValidate.bind(this);
  }

  render() {
    return (
      <div className="mt-2">
        <ModalImport
          isOpen={this.state.isImportModalOpen}
          onRequestClose={() => {
            this.setState({ isImportModalOpen: false });
          }}
          onValidate={this._onImportModalValidate}
        />
        Actions de masse:
        <button
          className="btn btn-primary ml-3"
          onClick={() => {
            this.setState({ isImportModalOpen: true });
          }}
        >
          Importer
        </button>
        <button
          className="btn btn-primary ml-1"
          onClick={() => {
            this._globalExport();
          }}
        >
          Exporter
        </button>
      </div>
    );
  }

  _globalExport() {
    this._copyTextToClipboard(JSON.stringify(this.props));
  }

  _onImportModalValidate(data) {
    console.log("onImportModalValidate: " + data);
    const action = { type: "IMPORT_GLOBAL_STATE", value: data };
    this.props.dispatch(action);
    this.setState({ isImportModalOpen: false });
  }

  _fallbackCopyTextToClipboard(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      let successful = document.execCommand("copy");
      let msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
  }

  _copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      this._fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function() {
        console.log("Async: Copying to clipboard was successful!");
      },
      function(err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(GlobalStateManager);
