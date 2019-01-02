import React from "react";

class CustomTable extends React.Component {
  render(): React.ReactNode {
    return <table class="table table-sm">{this.props.content}</table>;
  }
}

export default CustomTable;
