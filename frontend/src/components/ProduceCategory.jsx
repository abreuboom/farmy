import React, { Component } from "react";

export default class ProduceCategory extends Component {
  render() {
    return (
      <div className="produce-category">
        <p>{this.props.name}</p>
      </div>
    );
  }
}
