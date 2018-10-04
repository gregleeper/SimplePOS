import React, { Component } from "react";
import NavBar from "../components/navBar";
import db from "../services/db";

class CompleteTransaction extends Component {
  state = { transactions: [] };

  componentDidMount() {
    db.table("transactions")
      .toArray()
      .then(transactions => {
        this.setState({ transactions });
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar onTotal={this.handleTotal} />
        <div>
          <h1>Total Price</h1>
          <h6>${this.state.transactions.filter(id => id)}</h6>
        </div>
      </React.Fragment>
    );
  }
}

export default CompleteTransaction;
