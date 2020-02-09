import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { getImg } from "../actions/storage";

export default class Listing extends Component {
  constructor(props) {
    super(props);
  }

  createExpirationText() {
    var d = new Date(this.props.created_at);

    var time_diff = Date.now() - d.getTime();
    var day_diff = time_diff / (1000 * 3600 * 24);
    console.log(day_diff);

    if (day_diff >= 3) {
      return day_diff + " days old";
    } else {
      return "Just Posted";
    }
  }

  render() {
    console.log(this.props);

    let id = (this.props.produce.name + this.props.offer_id)
      .replace(/\s+/g, "")
      .toLowerCase();
    getImg(this.props.img_link, id);
    return (
      <div className="listing" id={id}>
        <div className="listing-gradient"></div>
        <div className="listing-header">
          <div className="listing-age caps">
            <p>{this.createExpirationText()}</p>
          </div>
        </div>
        <div className="listing-content">
          <div className="listing-details">
            <h2>{this.props.produce.name}</h2> <br />
            <p>
              ${this.props.price} per {this.props.units}
            </p>
          </div>
          <button className="listing-button">
            <Link
              to={{
                pathname: `buy/${this.props.offer_id}`,
                query: "/buy/"
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
