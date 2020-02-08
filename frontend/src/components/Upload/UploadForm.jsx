import React, { Component } from "react";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "tomato",
      price: "$2",
      quantity: "1",
      unit: "lbs"
    };
  }

  handleChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // do something here
    console.log(this.state);
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Listing Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Price per unit:
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="units">
            Units:
            <select
              name="units"
              id="units"
              value={this.state.units}
              onChange={this.handleChange}
            >
              <option value="lbs">lbs.</option>
              <option value="count">count</option>
            </select>
          </label>

          <button action="submit">Submit</button>
        </form>
      </div>
    );
  }
}
