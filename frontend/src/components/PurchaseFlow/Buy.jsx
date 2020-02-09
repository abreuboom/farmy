import "./css/pf.css";

import React, { Component } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/pf.css"
export default class Buy extends Component {

  render() {
    let { listing } = this.props;
    console.log(this.props);

    console.log(listing);

    if (listing) {
      console.log("yeet: " + listing.offer_id);

      return (
        <div className="container">
          <div className="buy-container" style={{}}>
            <img src={listing.img_url} alt=""></img>
            <div className="buy-item">
              <div id="title">{listing.title}</div>
              <p id="rating">4.9 stars</p>
              <p id="location">
                Boston, MA
                <span id="distance">
                  <float>0.1</float> mi
                </span>
              </p>
              <p id="tags">
                Tags:
                <span className="produce-category name">
                  {" "}
                  Veggies
                </span>
                <span className="produce-category name">
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
              <FontAwesomeIcon id ="pp" icon={faUserCircle}/>
              <p>{this.props.lister.first_name+" "+this.props.lister.last_name}</p>
            </div>
            <div className="contact-seller">
              <a href={this.props.lister.phone_num? `sms:+1${this.props.lister.phone_num}`:"#"}><span id="contactBox">Contact Seller</span></a>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>404 NOT FOUND</div>;
    }
  }
}
