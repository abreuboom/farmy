import React, { Component } from "react";

export default class cProduceCategory extends Component {
  render() {
    return <button className="produce-category">{this.props.name}</button>;
  }
}
