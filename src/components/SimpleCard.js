import React from "react";

class SimpleCard extends React.Component {
  render(): React.ReactNode {
    return (
      <div className="card mt-2">
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}

export default SimpleCard;
