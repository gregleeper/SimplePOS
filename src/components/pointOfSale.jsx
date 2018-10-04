import React, { Component } from "react";
import NavBar from "./navBar";
import "../App.css";
import Items from "./items";
import db from "../services/db";

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
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  handleIncrement = id => {
    console.log(id);
    console.log(this.state.items[0]);
    console.log(this.state.items[0].qty);
    const items = [...this.state.items];
    console.log(this.state.items);
    const index = this.findWithAttr(items, "id", id);
    items[index].qty++;
    console.log("new qty is: ", items[index].qty);
    this.setState({ items });
  };

  handleDecrement = id => {
    console.log(id);
    console.log(this.state.items[0]);
    console.log(this.state.items[0].qty);
    const items = [...this.state.items];
    console.log(this.state.items);
    const index = this.findWithAttr(items, "id", id);
    items[index].qty--;
    console.log("new qty is: ", items[index].qty);
    this.setState({ items });
  };

  handleReset = () => {
    db.table("items").clear();
  };
  handleDelete = itemId => {
    console.log("Event handler called", itemId);
    const items = this.state.items.filter(c => c.id !== itemId);
    this.setState({ items });
  };

  // handleTotal = total => {
  //   db.table("items")
  //     .update(id, { qty })
  //     .then(() => {
  //       const itemToInc = this.state.items.find(item => item.id === id);
  //       const newQty = this.state.item.qty;
  //       const newList = [
  //         ...this.state.items.filter(item => item.id !== id),
  //         Object.assign({}, itemToInc, { newQty })
  //       ];
  //       this.setState({ items: newList });
  //     });
  // };

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
        <NavBar
          totalItems={totalItems}
          totalPrice={totalPrice}
          onTotal={this.handleTotal}
          addItem={this.handleAddItem}
        />
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

export default PointOfSale;
