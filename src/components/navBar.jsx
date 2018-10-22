import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { addItem, totalItems, totalPrice } = this.props;
    return (
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand">
          SimplePOS{" "}
          <span className="badge badge-pill badge-secondary m-2">
            {totalItems}
          </span>
          <span className="badge badge-pill badge-secondary m-2">
            ${totalPrice}
          </span>
          <button
            onClick={this.props.onReset}
            className="btn btn-primary btn-sm m-1"
          >
            Clear
          </button>
        </a>
        <Link
          to={{ pathname: "/additem", state: { addItem } }}
          className="btn btn-primary btn-sm"
        >
          Add Item
        </Link>
        <Link to={{ pathname: "/review" }} className="btn btn-primary btn-sm">
          Review Sales
        </Link>
        <Link to={{ pathname: "/total" }} className="btn btn-primary btn-sm">
          Total
        </Link>
      </nav>
    );
  }
}

export default NavBar;
