import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-light bg-light">
        <a className="navbar-brand">
          SimplePOS{" "}
          <span className="badge badge-pill badge-secondary m-2">
            {this.props.totalItems}
          </span>
          <span className="badge badge-pill badge-secondary m-2">
            ${this.props.totalPrice}
          </span>
          <button
            onClick={this.props.onReset}
            className="btn btn-primary btn-sm m-2"
          >
            Reset
          </button>
        </a>
      </nav>
    );
  }
}

export default NavBar;
