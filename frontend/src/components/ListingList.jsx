import "../listings.css";

import React, { Component } from "react";

import Listing from "./Listing";

export default class ListingList extends Component {
  render() {
    // console.log(this.listings);
    let { listings } = this.props;

    return (
      <div className="container">
        <div className="listings-container">
          <p className="listings-title">Produce near you</p>
          <div className="listing-list">
            {listings.map(function(listing, i) {
              return <Listing {...listing} key={i} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
