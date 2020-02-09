import React, { Component } from "react";

import "./css/pf.css"
export default class Buy extends Component {
  render() {
    return (
      <div className="container">
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
              <span className="produce-category" id="veggies"> Veggies</span>
              <span className="produce-category" id="tomato"> Tomato </span>
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
            <p>Jack</p>
          </div>
          <div className ="contact-seller">
            <span id="contactBox">Contact Seller</span>
          </div>

        </div>
      </div>);
    }
  }
