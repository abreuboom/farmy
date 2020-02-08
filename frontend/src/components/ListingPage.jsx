import "../listings.css";

import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default class ListingPage extends Component {
  render() {
    return (
      <div className="container">
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
            <div className="listing-details">
              <h2>{this.props.title}</h2> <br />
              <p>{this.props.price}</p>
            </div>
            <button className="listing-button">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
