import React, { Component } from "react";
import { Link } from "react-router-dom";
import db from "../services/db";
import Items from "./addItemItems";
import "../App.css";
import { FormErrors } from "./formErrors";

// This class is used to input items to be sold

class AddItem extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      items: [],
      formErrors: { name: "", price: "" },
      nameValid: false,
      priceValid: false,
      formValid: false
    };
  }

  // mounts the items table on page render
  componentDidMount() {
    db.table("items")
      .toArray()
      .then(items => {
        this.setState({ items });
      });
  }

  // uses lifecycle component to render items on lifecycle update
  // such as the add items and delete items handlers
  componentDidUpdate() {
    db.table("items")
      .toArray()
      .then(items => {
        this.setState({ items });
      });
  }

  // inserts the obejct inputted by the user into the items table
  // and sets the qty to 0
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

  // removes the item with given id from the items table
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

  // used for event change in the input form
  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  // validates each data field
  // checks for non empty string in Name field
  // and requires a price number structure like 1.00 for price field
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let priceValid = this.state.priceValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 0;
        fieldValidationErrors.name = nameValid ? "" : " is invalid";
        break;
      case "price":
        priceValid = value.match(/\d+\.\d{1,2}/);
        fieldValidationErrors.price = priceValid
          ? ""
          : " price not valid, example 1.00 or 2.50";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        priceValid: priceValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.priceValid
    });
  }

  // called when user hits add item
  // calls handleAddItem and passes over the name and price
  doSubmit = () => {
    console.log(this.state.name, this.state.price);
    this.handleAddItem(this.state.name, this.state.price);

    // resets the formValid field back false after submission
    this.setState({ formValid: false });
    document.getElementById("addItem").reset();
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-light bg-light">
          <a className="navbar-brand">SimplePOS</a>
          <Link to="/" className="btn btn-primary btn-sm m-2">
            Back to POS
          </Link>
        </nav>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
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
              disabled={!this.state.formValid}
              onClick={this.doSubmit}
            >
              Add Item
            </button>
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
