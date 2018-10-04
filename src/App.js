import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import PointOfSale from "./components/pointOfSale";
import CompleteTransaction from "./components/completeTransaction";
import AddItem from "./components/addItem";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/total" component={CompleteTransaction} />
          <Route path="/pointofsale" component={PointOfSale} />
          <Route path="/additem" component={AddItem} />
          <Redirect path="/" exact to="/pointofsale" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
