import "./App.css";

import ListingList from "./components/ListingList";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import React from "react";
import logo from "./logo.svg";

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <NavigationBar />
      <ProduceFilter produceCategories={[]} />
      <ListingList />
    </div>
  );
};

export default App;
