import React from "react";

class CustomTable extends React.Component {
  render(): React.ReactNode {
    return (
      <div style={styles.tableContainer}>
        <table className="table table-sm">
          <tbody>{this.props.content}</tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  tableContainer: {
    maxHeight: "360px",
    overflow: "auto"
  }
};

export default CustomTable;
