import "./App.css";

import React, { Component, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Buy from "./components/PurchaseFlow/Buy";
import ListingList from "./components/ListingList";
// import ListingPage from "./components/ListingPage";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import UploadForm from "./components/UploadForm";
import Axios from "axios";
import { userStore } from "./stores/UserStore";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      listings: [],
      produce: [],
      produceFilter: "none",
      currentListing: 0,
      users: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const pre = "https://cors-anywhere.herokuapp.com/";
    const urls = [
      "http://farme-2020.herokuapp.com/api/listings",
      "http://farme-2020.herokuapp.com/api/produce"
    ];
    Promise.all(urls.map(url => fetch(pre + url).then(res => res.json()))).then(
      data => {
        console.log(data);
        this.getAllUsers()
          .then(allUsers => {
            this.setState({
              users: allUsers,
              listings: data[0],
              produce: data[1]
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    );
  };

  // componentDidUpdate() {
  //   this.setState({ currentListing: this.getCurrentListing });
  // }

  // getListings() {
  //   switch (this.state.produceFilter) {
  //     case "none":
  //       return this.state.listings;
  //     case "tomatoes":
  //       return this.state.listings.filter(d => d.produce_type === "tomato");
  //     default:
  //       return this.state.listings;
  //   }
  // }

  // getCategories() {
  //   let d = this.state.listings;
  //   var categories = {};

  //   d.forEach(listing => {
  //     categories[listing.produce[0].name] += 1;
  //   });

  //   console.log(categories);
  //   return categories;
  // }

  getCurrentListing() {
    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let id = params.get("id");

    console.log(id);

    return parseInt(id);
  }
  getAllUsers = username => {
    return new Promise((resolve, rej) => {
      axios
        .get("/api/users")
        .then(res => {
          console.log(res);
          resolve(res.data);
        })
        .catch(e => {
          console.log(e.response);
          rej(e);
        });
    });
  };

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
              <UploadForm getData={this.getData} />
            </Route>
            <Route
              path="/buy/:id"
              render={route => {
                let i = route.match.params.id;
                let matchedListing = this.state.listings.find(
                  x => x.offer_id === parseInt(i)
                );
                console.log(this.state);
                return (
                  <Buy
                    {...route}
                    lister={this.state.users.find(
                      x => x.username === matchedListing.lister[0].username
                    )}
                    listing={matchedListing}
                  />
                );
              }}
            ></Route>
            {/* <Route path="/listing/">
              <ListingPage {...this.getCurrentListing()} />
            </Route> */}
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <>
                    <ProduceFilter
                      categories={this.state.produce}
                      setFilter={this.setFilter}
                    />

                    <ListingList listings={this.state.listings} />
                  </>
                );
              }}
            ></Route>
            <Route path="/login" component={UserSelector} />>
          </Switch>
        </Router>
      </div>
    );
  }
}

const UserSelector = () => {
  let [state, setState] = useState([]);

  Axios.get("/api/users").then(data => {
    setState(data.data);
  });

  return (
    <div>
      {state.map(elem => (
        <button
          onClick={() => userStore.getUser(elem.username)}
          key={elem.username}
        >
          {elem.username}
        </button>
      ))}
    </div>
  );
};
