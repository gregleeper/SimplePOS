import React, { Component } from "react";
import { Link } from "react-router-dom";
import db from "../services/db";

class AddItem extends Component {
  constructor() {
    super();
    this.state = { name: "", price: "" };
  }

  componentDidMount() {
    db.table("items")
      .toArray()
      .then(items => {
        console.log(items);
        this.setState({ items });
      });
  }

  handleAddItem(name, price) {
    db.open();
    console.log("name", name, price);
    db.transaction("rw", db.items, function() {
      const insert_object = { name: name, price: price, qty: 0 };
      db.items.add(insert_object);
    }).catch(function(err) {
      console.error(err.stack || err);
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  doSubmit = () => {
    console.log(this.state.name, this.state.price);
    this.handleAddItem(this.state.name, this.state.price);
    document.getElementById("addItem").reset();
  };

  render() {
    return (
      <div>
        <form id="addItem" onSubmit={this.doSubmit}>
          <input
            type="text"
            name="name"
            onChange={evt => this.handleChange(evt)}
          />
          <input
            type="number"
            name="price"
            onChange={evt => this.handleChange(evt)}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm m-2"
            onClick={this.doSubmit}
          >
            Add Item
          </button>
          <Link to="/pointofsale" className="btn btn-primary btn-sm m-2">
            Back to POS
          </Link>
        </form>
      </div>
    );
  }
}

export default AddItem;
