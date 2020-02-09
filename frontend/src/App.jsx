import "./App.css";

import React, { Component, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Buy from "./components/Buy";
import ListingList from "./components/ListingList";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import { ScrollToTop } from "./ScrollToTop";
import UploadForm from "./components/UploadForm";
import axios from "axios";
import { userStore } from "./stores/UserStore";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      listings: [],
      produce: [],
      produceFilter: "All",
      currentListing: 0,
      users: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  changeFilter = filterOption => {
    this.setState({
      filter: filterOption
    });
  };
  getData = () => {
    const pre = "https://cors-anywhere.herokuapp.com/";
    const urls = [
      "http://farme-2020.herokuapp.com/api/listings",
      "http://farme-2020.herokuapp.com/api/produce"
    ];
    Promise.all(urls.map(url => fetch(pre + url).then(res => res.json()))).then(
      data => {
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

  getCurrentListing() {
    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);
    let id = params.get("id");

    console.log(id);

    return parseInt(id);
  }
  getAllUsers = () => {
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

  setFilter(e) {
    this.setState({ produceFilter: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <NavigationBar />
          <ScrollToTop />
          <Switch>
            <Route
              path="/sell"
              render={route => {
                return <UploadForm getData={this.getData} {...route} />;
              }}
            ></Route>
            <Route
              path="/buy/:id"
              render={route => {
                let i = route.match.params.id;
                let matchedListing = this.state.listings.find(
                  x => x.offer_id === parseInt(i)
                );
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

                    <ListingList
                      listings={this.state.listings}
                      produceFilter={this.state.produceFilter}
                    />
                  </>
                );
              }}
            ></Route>
            <Route path="/login" component={UserSelector} />>
          </Switch>
        </Router>

        <div className="footer">Made with 🌱 at HackBeanpot 2020</div>
      </div>
    );
  }
}

const UserSelector = () => {
  let [state, setState] = useState([]);

  axios.get("/api/users").then(data => {
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
