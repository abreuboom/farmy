import React, { Component } from "react";

export default class Listing extends Component {
  render() {
    return (
      <div
        className="listing"
        style={{ backgroundImage: "url(" + this.props.img_url + ")" }}
      >
        <div className="listing-gradient"></div>
        <div className="listing-header">
          <div className="listing-age caps">
            <p>{this.props.date_posted}</p>
          </div>
        </div>
        <div className="listing-content">
          <h2>{this.props.title}</h2>
          <div className="listing-details">
            <p>{this.props.price}</p>
          </div>
        </div>
      </div>
    );
  }
}
