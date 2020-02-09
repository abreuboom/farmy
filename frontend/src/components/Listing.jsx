import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default class Listing extends Component {
  render() {
    console.log(this.props);

    return (
      <div
        className="listing"
        style={{ backgroundImage: "url(" + this.props.img_link + ")" }}
      >
        <div className="listing-gradient"></div>
        <div className="listing-header">
          <div className="listing-age caps">
            <p>{this.props.date_posted}</p>
          </div>
        </div>
        <div className="listing-content">
          <div className="listing-details">
            <h2>{this.props.produce[0].name}</h2> <br />
            <p>
              {this.props.price} per {this.props.units}
            </p>
          </div>
          <button className="listing-button">
            <Link
              to={{
                pathname: `listing?id=${this.props.id}`,
                query: "/listing/"
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
