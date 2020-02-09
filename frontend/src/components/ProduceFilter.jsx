import React, { Component } from "react";

export default class ProduceFilter extends Component {
  render() {
    let { categories } = this.props;
    let filter = filter => this.filterListings(filter);

    return (
      <div className="produce-filter-container container">
        <div className="produce-filter">
          <ProduceCategory name="All" setFilter={this.props.setFilter} />
          {categories.map((produce, i) => {
            return (
              <ProduceCategory
                name={produce.name}
                setFilter={this.props.setFilter}
                key={i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const ProduceCategory = props => {
  return (
    <button
      value={props.name}
      className="produce-category"
      onClick={props.setFilter}
    >
      {props.name}
    </button>
  );
};
