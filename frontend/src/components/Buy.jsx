import "../pf.css";

import React, { Component } from "react";
import { faStar, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getImg } from "../actions/storage";

export default class Buy extends Component {
  render() {
    let { listing } = this.props;

    if (listing) {
      let id = (listing.produce[0].name + listing.offer_id)
        .replace(/\s+/g, "")
        .toLowerCase();
      getImg(listing.img_link, id);

      return (
        <div className="container">
          <div className="buy-container" style={{}}>
            <img id={id} alt=""></img>
            <div className="buy-item">
              <div id="title">{listing.title}</div>
              <p id="location">
                Boston, MA
                <span id="distance">
                  <float>0.1</float> mi
                </span>
              </p>
              <p id="tags">
                Tags:
                <span className="produce-category name"> Veggies</span>
                <span className="produce-category name"> Tomato </span>
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
              <FontAwesomeIcon id="pp" icon={faUserCircle} />
              <p>
                {this.props.lister.first_name +
                  " " +
                  this.props.lister.last_name}
              </p>
              <div id="rating">
                <FontAwesomeIcon id="star" icon={faStar} />
                <p>4.9</p>
              </div>
            </div>

            <div className="contact-seller">
              <a
                href={
                  this.props.lister.phone_num
                    ? `sms:+1${this.props.lister.phone_num}`
                    : "#"
                }
              >
                <span id="contactBox">Contact Seller</span>
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>404 NOT FOUND</div>;
    }
  }
}
