import React, { Component } from "react";

import Listing from "./Listing";

export default class ListingList extends Component {
  listings = this.props.listings;
  render() {
    return (
      <div>
        {this.listings.map(function(listing, i) {
          return <Listing {...listing} key={i} />;
        })}
      </div>
    );
  }
}
