import React, { Component } from "react";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "tomato",
      price: "$2 per lb",
      quantity: "1lb"
    };
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Listing Title:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Listing Title:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
