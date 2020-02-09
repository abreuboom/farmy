import React, { Component } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/pf.css"
export default class Buy extends Component {
  render() {
    return (
      <div className="base-container">
        <div className="buy-container" style={{ }}>
          <img src={this.props.img_url}></img>
          <div className="buy-item">
            <div id="title">
            {this.props.title}
            </div>
            <p id="rating">
              4.9 stars
            </p>
            <p id="location">
              Boston, MA
              <p id="distance"><float>0.1</float> mi</p>
            </p>
            <p id="tags">Tags:
              <span className="produce-category name">Veggies</span>
            </p>

          </div>
          <hr></hr>
          <div className = "buy-detail">
            <p id="price">{this.props.price} per {this.props.units}</p>
            <p id="availablility">{this.props.quantity} Units Available</p>
          </div>
          <hr></hr>
          <div className="buy-seller">
            <p id="title">Seller Info</p>
            <FontAwesomeIcon id ="pp" icon={faUserCircle}/>
            <p>Jack</p>
          </div>
          <div className ="contact-seller">
            <a href="http://example.com"><span id="contactBox">Contact Seller</span></a>
          </div>

        </div>
      </div>);
    }
  }
