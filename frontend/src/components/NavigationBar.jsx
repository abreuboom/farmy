import "../navigation.css";

import React, { Component } from "react";
import {
  faSeedling,
  faShoppingBasket
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default class NavigationBar extends Component {
  render() {
    return (
      <div className="container">
        <div className="nav-bar">
          <NavLink activeClassName="active" to="/sell">
            <FontAwesomeIcon icon={faSeedling} />
          </NavLink>
          <h1>farmy</h1>
          <NavLink activeClassName="active" to="/browse">
            <FontAwesomeIcon icon={faShoppingBasket} />
          </NavLink>
        </div>
      </div>
    );
  }
}
