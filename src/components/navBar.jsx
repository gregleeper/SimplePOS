import React, { Component } from "react";
import { Link } from "react-router-dom";

// displays the navbar using props passed down from pointofsale.jsx

class NavBar extends Component {
  render() {
    const { addItem, totalItems, totalPrice, onReset } = this.props;
    return (
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand">
          SimplePOS{" "}
          <span className="badge badge-pill badge-secondary m-1">
            {totalItems}
          </span>
          <span className="badge badge-pill badge-secondary m-1">
            ${totalPrice}
          </span>
          <button onClick={onReset} className="btn btn-danger btn-md m-2">
            Clear
          </button>
          <Link
            to={{ pathname: "/additem", state: { addItem } }}
            className="btn btn-primary btn-sm"
          >
            Add Item
          </Link>
          <Link
            to={{ pathname: "/review" }}
            className="btn btn-primary btn-sm m-2"
          >
            Review Sales
          </Link>
        </a>
        <Link
          to={{ pathname: "/total" }}
          className="btn btn-primary btn-sm m-2"
        >
          Total
        </Link>
      </nav>
    );
  }
}

export default NavBar;
