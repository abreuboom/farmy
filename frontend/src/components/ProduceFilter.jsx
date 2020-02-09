import React, { Component } from "react";

export default class ProduceFilter extends Component {
  constructor(props) {
    super(props);
    this.filterListings = this.filterListings.bind(this);
    this.state = {
      filter: "none"
    };
  }

  filterListings(filter) {
    this.setState({ filter: filter });
    this.props.setFilter(this.state.filter);
  }

  render() {
    let { categories } = this.props.categories;
    let filter = filter => this.filterListings(filter);

    return (
      <div className="produce-filter-container container">
        <div className="produce-filter">
          <ProduceCategory {...{ name: "All" }} />
          {/* {categories.map(function(produce, i) {
            return <ProduceCategory {...produce} onClick={filter} key={i} />;
          })} */}
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
      <button className="produce-category" onClick={this.handleClick}>
        {this.name}
      </button>
    );
  }
}
