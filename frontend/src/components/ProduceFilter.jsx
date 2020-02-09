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

class ProduceCategory extends Component {
  name = this.props.name;
  handleClick = () =>
    this.props.onClick(this.name === "All" ? "none" : this.props.name);

  render() {
    return (
      <button
        value={this.props.name}
        className="produce-category"
        onClick={this.props.setFilter}
      >
        {this.name}
      </button>
    );
  }
}
