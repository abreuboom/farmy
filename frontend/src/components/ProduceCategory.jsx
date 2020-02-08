import React, { Component } from "react";

export default class ProduceCategory extends Component {
  produce = this.props.produce;
  render() {
    return (
      <div class="produce-category">
        <div>
          <p>{this.produce.name}</p>
        </div>
      </div>
    );
  }
}
