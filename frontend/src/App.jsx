import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ListingList from "./components/ListingList";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import React from "react";
import data from "./dummy_data.json";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/">
            <ProduceFilter produceCategories={data.produce_categories} />
            <ListingList listings={data.listings} />
          </Route>
          <Route path="/sell"></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
