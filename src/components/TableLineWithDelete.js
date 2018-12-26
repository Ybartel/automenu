import React from "react";

class TableLineWithDelete extends React.Component {
  render(): React.ReactNode {
    return (
      <tr>
        <td>{this.props.children}</td>
        <td>
          <button onClick={this.props.onDeleteClick}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableLineWithDelete;
