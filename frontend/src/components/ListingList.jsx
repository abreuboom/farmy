import "../listings.css";

import React, { Component } from "react";

import Listing from "./Listing";

export default class ListingList extends Component {
  render() {
    // console.log(this.listings);
    let { listings, produceFilter } = this.props;

    return (
      <div className="container">
        <div className="listings-container">
          <p className="listings-title">Produce near you</p>
          {listings
            .filter(listing => {
              if (
                produceFilter !== "All" &&
                listing.produce[0].name !== produceFilter
              ) {
                return false;
              } else {
                return true;
              }
            })
            .map(function(listing, i) {
              return <Listing {...listing} key={i} />;
            })}
        </div>
      </div>
    );
  }
}
