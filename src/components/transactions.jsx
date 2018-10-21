import React, { Component } from "react";
import "../App.css";
import NavBar from "../components/navBar";
import db from "../services/db";
import TransactionsTable from "./transactionsTable";

class Transactions extends Component {
  state = {
    transactions: []
  };
  componentDidMount() {
    db.table("transactions")
      .toArray()
      .then(transactions => {
        this.setState({ transactions });
        console.log(this.state.transactions);
      });
  }
  render() {
    const { transactions } = this.state;
    // // const rendertransactions = () => {
    // //   if (transactions.length === 0) {
    // //     return <p>No Transactions found</p>;
    // //   }
    // //   return transactions.map(transaction => (
    // //     <TransactionsTable {...transaction} />
    // //   ));
    // };
    return <TransactionsTable transactions={this.state.transactions} />;
  }
}
export default Transactions;
