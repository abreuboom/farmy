import "./css/pf.css";

import React, { Component } from "react";

export default class Buy extends Component {
  render() {
    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let id = params.get("id");

    let { listings } = this.props;

    let listing = listings.find(x => x.offer_id === parseInt(id));

    if (listing) {
      console.log(listing);

      return (
        <div className="container">
          <div className="buy-container" style={{}}>
            <img src={listing.img_url} alt=""></img>
            <div className="buy-item">
              <div id="title">{listing.title}</div>
              <p id="rating">4.9 stars</p>
              <p id="location">
                Boston, MA
                <p id="distance">
                  <float>0.1</float> mi
                </p>
              </p>
              <p id="tags">
                Tags:
                <span className="produce-category" id="veggies">
                  {" "}
                  Veggies
                </span>
                <span className="produce-category" id="tomato">
                  {" "}
                  Tomato{" "}
                </span>
              </p>
            </div>
            <hr></hr>
            <div className="buy-detail">
              <p id="price">
                {listing.price} per {listing.units}
              </p>
              <p id="availablility">{listing.quantity} Units Available</p>
            </div>
            <hr></hr>
            <div className="buy-seller">
              <p id="title">Seller Info</p>
              <p>Jack</p>
            </div>
            <div className="contact-seller">
              <span id="contactBox">Contact Seller</span>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>404 NOT FOUND</div>;
    }
  }
}
