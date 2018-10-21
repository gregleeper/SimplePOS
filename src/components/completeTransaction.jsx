import React, { Component } from "react";
import NavBar from "../components/navBar";
import db from "../services/db";
import ItemsTable from "./itemsTable";
import { Modal, Button } from "react-bootstrap";
//Todo this whole component needs to fixed
class CompleteTransaction extends Component {
  state = { items: [], total: 0 };

  componentDidMount() {
    db.table("items")
      .where("qty")
      .above(0)
      .toArray()
      .then(items => {
        this.setState({ items });
        console.log("items from component mount", items);
      });
  }

  handleCompleteTransaction = () => {
    const items = { ...this.state.items };
    console.log("copied items state", items);
    const totalPrice = this.state.items.reduce(
      (accum, curr) => (accum += curr.qty * curr.price),
      0
    );
    console.log(totalPrice);
    console.log(items);
    db.transaction("rw", db.transactions, function() {
      db.transactions.put({ items, total: totalPrice });
    }).catch(function(err) {
      console.error(err.stack || err);
    });
    setTimeout(this.doSubmit, 100);
  };

  doSubmit = () => {
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
    this.props.history.push("/pointofsale");
  };

  render() {
    const totalItems = this.state.items
      .map(m => m.qty)
      .reduce((accum, curr) => accum + curr, 0);
    const totalPrice = this.state.items.reduce(
      (accum, curr) => (accum += curr.qty * curr.price),
      0
    );

    return (
      <React.Fragment>
        <NavBar onTotal={this.handleTotal} />
        <div>
          <h1>Total Price</h1>
          <h6>${totalPrice}</h6>
          <h1>Total Items</h1>
          <h6>{totalItems}</h6>
          <button
            type="button"
            className="btn btn-primary btn-sm m-2"
            onClick={this.handleCompleteTransaction}
          >
            Complete Transaction
          </button>
        </div>
        <ItemsTable items={this.state.items} />
      </React.Fragment>
    );
  }
}

export default CompleteTransaction;
