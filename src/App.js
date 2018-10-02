import React, { Component } from "react";
import NavBar from "./componenets/navBar";
import "./App.css";
import Items from "./componenets/items";
import { getItems } from "./services/menuService";

class App extends Component {
  state = { items: getItems() };

  handleIncrement = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].value++;
    console.log(item.value);
    this.setState({ items });
  };

  handleDecrement = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...item };
    items[index].value--;
    console.log(item.value);
    this.setState({ items });
  };

  handleReset = () => {
    const items = this.state.items.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ items });
  };
  handleDelete = itemId => {
    console.log("Event handler called", itemId);
    const items = this.state.items.filter(c => c.id !== itemId);
    this.setState({ items });
  };

  render() {
    const totalItems = this.state.items
      .map(m => m.value)
      .reduce((accum, curr) => accum + curr, 0);
    const totalPrice = this.state.items.reduce(
      (accum, curr) => (accum += curr.value * curr.price),
      0
    );

    return (
      <React.Fragment>
        <NavBar totalItems={totalItems} totalPrice={totalPrice} />
        <main className="container">
          <div className="row">
            <div className="col-sm-6">
              <Items
                items={this.state.items}
                names={this.state.items.name}
                prices={this.state.items.price}
                onReset={this.handleReset}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
