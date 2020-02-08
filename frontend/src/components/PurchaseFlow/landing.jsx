import React, { Component } from "react";

export default class ListingAge extends Component {
  render() {
    return (
      <div
        className="produce-img"
        style={{ backgroundImage: "url(" + this.props.img_url + ")" }}
        >
    </div>);
  }
}
