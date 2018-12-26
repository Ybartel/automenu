import React from "react";

class SimpleCard extends React.Component {
  render(): React.ReactNode {
    return (
      <div class="px-3">
        <div className="card mt-2">
          <div className="card-body">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default SimpleCard;
