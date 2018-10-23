import React, { Component } from "react";
import NavBar from "./navBar";
import "../App.css";
import Items from "./items";
import db from "../services/db";

// main entry point for the app
// mounts the items db table and loads it into state

class PointOfSale extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    db.table("items")
      .toArray()
      .then(items => {
        this.setState({ items });
        console.log(this.state.items);
      });
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i <= array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  handleIncrement = id => {
    console.log(id);
    const items = [...this.state.items];
    console.log(this.state.items);
    const index = this.findWithAttr(items, "id", id);
    if (index === -1) {
      console.log("Found -1");
    }
    items[index].qty++;
    console.log("new qty is: ", items[index].qty);
    this.setState({ items });
    db.transaction("rw", db.items, async () => {
      db.items.put({
        name: items[index].name,
        price: items[index].price,
        qty: items[index].qty,
        id: items[index].id
      });
    });
  };

  handleDecrement = id => {
    console.log(id);
    const items = [...this.state.items];
    console.log(this.state.items);
    const index = this.findWithAttr(items, "id", id);
    items[index].qty--;
    console.log("new qty is: ", items[index].qty);
    this.setState({ items });
    db.transaction("rw", db.items, async () => {
      db.items.put({
        name: items[index].name,
        price: items[index].price,
        qty: items[index].qty,
        id: items[index].id
      });
    });
  };

  handleReset = () => {
    const items = this.state.items.map(i => {
      i.qty = 0;
      return i;
    });
    this.setState({ items });
    for (let i = 0; i < items.length; ++i) {
      db.items.put({
        name: items[i].name,
        price: items[i].price,
        qty: 0,
        id: items[i].id
      });
    }
  };

  handleDelete = itemId => {
    //console.log("Event handler called", itemId);
    const items = [...this.state.items];
    const index = this.findWithAttr(items, "id", itemId);
    items[index].qty = 0;
    //const items = this.state.items.filter(c => c.id !== itemId);
    this.setState({ items });
    db.transaction("rw", db.items, async () => {
      db.items.put({
        name: items[index].name,
        price: items[index].price,
        qty: 0,
        id: items[index].id
      });
    });
  };

  render() {
    // Figures total item count and total price for display in NavBar
    const totalItems = this.state.items
      .map(m => m.qty)
      .reduce((accum, curr) => accum + curr, 0);
    const totalPrice = this.state.items.reduce(
      (accum, curr) => (accum += curr.qty * curr.price),
      0
    );

    const emptyItemsState = () => {
      if (this.state.items.length === 0) {
        return <p>Tap "Add Items" to add items to be sold. </p>;
      }
    };

    return (
      <React.Fragment>
        <NavBar
          totalItems={totalItems}
          totalPrice={totalPrice}
          onReset={this.handleReset}
          onTotal={this.handleTotal}
          addItem={this.handleAddItem}
        />
        <main className="container">
          <div>{emptyItemsState()}</div>
          <div className="row">
            <div className="col-sm-12">
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

export default PointOfSale;
