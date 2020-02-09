import "./App.css";

import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Buy from "./components/PurchaseFlow/Buy";
import ListingList from "./components/ListingList";
import ListingPage from "./components/ListingPage";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
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

// import data from "./dummy_data.json";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      listings: [],
      produceFilter: "none"
    };
  }

  componentDidMount() {
    var that = this;

    let url =
      "https://cors-anywhere.herokuapp.com/" +
      "http://farme-2020.herokuapp.com/listings";
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        that.setState({ listings: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCurrentListing() {
    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let id = params.get("id");

    let l = this.state.listings.find(x => x.id === id);

    return l;
  }

  getListings() {
    switch (this.state.produceFilter) {
      case "none":
        return this.state.listings;
      case "tomatoes":
        return this.state.listings.filter(d => d.produce_type === "tomato");
      default:
        return this.state.listings;
    }
  }

  getCategories() {
    let d = this.state.listings;
    var categories = {};

    d.forEach(listing => {
      categories[listing.produce[0].name] += 1;
    });

    console.log(categories);

    return categories;
  }

  setFilter(filter) {
    this.setState({ produceFilter: filter });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/sell">
              <UploadForm />
            </Route>
            <Route path="/buy">
              <Buy />
            </Route>
            <Route path="/listing/">
              <ListingPage {...this.getCurrentListing()} />
            </Route>
            <Route path="/browse">
              <ProduceFilter
                categories={this.getCategories()}
                setFilter={this.setFilter}
              />
              <ListingList listings={this.getListings()} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
