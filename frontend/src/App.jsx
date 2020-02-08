import "./App.css";

import ListingList from "./components/ListingList";
import NavigationBar from "./components/NavigationBar";
import ProduceFilter from "./components/ProduceFilter";
import React from "react";
import data from "./dummy_data.json";

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <ProduceFilter produceCategories={data.produce_categories} />
      <ListingList />
    </div>
  );
};

export default App;
