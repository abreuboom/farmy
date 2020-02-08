import "./App.css";

import ListingList from "./components/ListingList";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import React from "react";
import data from "./dummy_data.json";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

const App = () => {
  return ( <
    div className = "App" >
    <
    Router >
    <
    NavigationBar / >
    <
    Switch >
    <
    Route path = "/"
    component = {
      Home
    }
    />> <
    /Switch> <
    /Router> <
    /div>
  );
};

const Home = () => {
  return ( <
    >
    <
    ProduceFilter produceCategories = {
      data.produce_categories
    }
    /> <
    ListingList listings = {
      data.listings
    }
    /> <
    />
  )
}

export default App;