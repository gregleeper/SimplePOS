import React, { Component } from "react";
import db from "../services/db";
import ItemsTable from "./itemsTable";
import { Link } from "react-router-dom";

// Rendered when user chooses the Total button
// mounts the items db table using each item > qty 0
class CompleteTransaction extends Component {
  state = { items: [], total: 0, date: "" };

  // db call to items table where qty above 0
  // sets state
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

  // computes total price and adds the items state to the
  // transactions table. The transaction includes each item
  // and its qty and the total price
  handleCompleteTransaction = () => {
    const items = { ...this.state.items };
    const totalPrice = this.state.items.reduce(
      (accum, curr) => (accum += curr.qty * curr.price),
      0
    );
    const now = new Date().toLocaleString();
    db.transaction("rw", db.transactions, function() {
      db.transactions.put({ items, total: totalPrice, date: now });
    }).catch(function(err) {
      console.error(err.stack || err);
    });
    // using setTimeoult to call the doSubmit method after a 100ms delay
    // gives the handleCompleteTransaction method time to complete before doSubmit starts
    setTimeout(this.doSubmit, 100);
  };

  // sets each item qty to 0 and records that in the db table as well
  // sends user back to pos screen with item qtys at 0
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
    this.props.history.push("/");
  };

  render() {
    const totalItems = this.state.items
      .map(m => m.qty)
      .reduce((accum, curr) => accum + curr, 0);
    const totalPrice = this.state.items.reduce(
      (accum, curr) => (accum += curr.qty * curr.price),
      0
    );
    const zero = totalItems === 0;

    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-light bg-light">
          <a className="navbar-brand">SimplePOS</a>
          <Link to="/" className="btn btn-primary btn-sm m-2">
            Back to POS
          </Link>
        </nav>
        <div>
          <h1>Total Due</h1>
          <h6>${totalPrice}</h6>
          <h1>Total Items</h1>
          <h6>{totalItems}</h6>
          <button
            disabled={zero}
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
