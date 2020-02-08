import "../navigation.css";

import React, { Component } from "react";
import {
  faSeedling,
  faShoppingBasket
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NavigationBar extends Component {
  render() {
    return (
      <div className="container">
        <div className="nav-bar">
          <a href="" className="">
            {" "}
            <FontAwesomeIcon icon={faSeedling} />
          </a>
          <h1>farmy</h1>
          <a href="" className="active">
            {" "}
            <FontAwesomeIcon icon={faShoppingBasket} />
          </a>
        </div>
      </div>
    );
  }
}
