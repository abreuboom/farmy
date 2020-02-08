import React, { Component } from "react";

import ProduceCategory from "./ProduceCategory";

export default class ProduceFilter extends Component {
  produceCategories = this.props.produceCategories;
  render() {
    return (
      <div className="produce-filter-container container">
        <div className="produce-filter">
          {this.produceCategories.map(function(produce, i) {
            console.log(produce);
            return <ProduceCategory {...produce} key={i} />;
          })}
        </div>
      </div>
    );
  }
}
