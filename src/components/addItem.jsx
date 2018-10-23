import React, { Component } from "react";
import { Link } from "react-router-dom";
import db from "../services/db";
import Items from "./addItemItems";
import "../App.css";

class AddItem extends Component {
  constructor() {
    super();
    this.state = { name: "", price: "", items: [] };
  }

  componentDidMount() {
    db.table("items")
      .toArray()
      .then(items => {
        this.setState({ items });
      });
  }

  componentDidUpdate() {
    db.table("items")
      .toArray()
      .then(items => {
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

  handleDelete = itemId => {
    console.log("Event handler called", itemId);
    const items = this.state.items.filter(c => c.id !== itemId);
    this.setState({ items });
    db.transaction("rw", db.items, function() {
      db.items
        .where("id")
        .equals(itemId)
        .delete();
    }).catch(function(err) {
      console.error(err.stack || err);
    });
  };

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
      <React.Fragment>
        <nav className="navbar sticky-top navbar-light bg-light">
          <a className="navbar-brand">SimplePOS</a>
        </nav>
        <div>
          <form id="addItem" onSubmit={this.doSubmit}>
            <div className="form-group m-6">
              <label>
                Name:
                <input
                  type="text"
                  className="form-control m-6"
                  name="name"
                  onChange={evt => this.handleChange(evt)}
                />
              </label>
            </div>
            <div className="form-group m-6">
              <label>
                Price
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  onChange={evt => this.handleChange(evt)}
                />
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-sm m-2"
              onClick={this.doSubmit}
            >
              Add Item
            </button>
            <Link to="/" className="btn btn-primary btn-sm m-2">
              Back to POS
            </Link>
          </form>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Items
                  items={this.state.items}
                  names={this.state.items.name}
                  prices={this.state.items.price}
                  onDelete={this.handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddItem;
