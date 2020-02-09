import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ListingList from "./components/ListingList";
import Buy from "./components/PurchaseFlow/Buy"
import ListingPage from "./components/ListingPage";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import React from "react";
import UploadForm from "./components/UploadForm";
import data from "./dummy_data.json";

const App = () => {
  let url = new URL(window.location);
  let params = new URLSearchParams(url.search);
  let listingId = params.get("id");

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/sell">
            <UploadForm />
          </Route>
          <Route path="/buy">
            <Buy {...getListingById(listingId)}/>
          </Route>
          <Route path="/listing/">
            <ListingPage {...getListingById(listingId)} />
          </Route>
          <Route path="/browse">
            <ProduceFilter produceCategories={data.produce_categories} />
            <ListingList listings={data.listings} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

function getListingById(id) {
  let l = data.listings.find(x => x.id === id);
  console.log(l);
  console.log(id);

  return l;
}

export default App;
