import React, { Component } from "react";

export default class ProduceCategory extends Component {
  render() {
    return (
      <div className="produce-category">
        <p className="caps">{this.props.name}</p>
      </div>
    );
  }
}
