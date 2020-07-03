import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/Shop/shop.component";
import Header from "./components/header/header.component";

function App() {
  return (
    <div className="App">
      {/*placing the header outside the switch and routers will allow it to display in every page*/}
      <Header/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
