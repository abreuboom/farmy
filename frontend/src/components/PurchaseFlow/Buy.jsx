import React, { Component } from "react";

import "./css/pf.css"
export default class Buy extends Component {
  render() {
    return (
      <div className="container">
        <div className="buy-container" style={{ }}>
          <img src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
          <div className="buy-item">
            <h2 >
              Fresh Tomatoes
            </h2>
            <p>
              4.9 stars
            </p>
            <p>
              Boston, MA
            </p>
          </div>
          <hr></hr>
          <div className = "buy-detail">
            <p>2<span>&#36;</span> / lb</p>
            <p>2 units Available</p>
          </div>
          <hr></hr>
          <div className="buy-seller"></div>
          <p>Seller Info</p>

        </div>
      </div>);
    }
  }
