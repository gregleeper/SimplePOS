import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import db from "../services/db";
import TransactionsTable from "./transactionsTable";

// this class mounts the transactions db table and passes
// the data down to be rendered by TransactionsTable
class Transactions extends Component {
  state = {
    transactions: []
  };
  componentDidMount() {
    db.table("transactions")
      .toArray()
      .then(transactions => {
        this.setState({ transactions });
      });
  }

  componentDidUpdate() {
    db.table("transactions")
      .toArray()
      .then(transactions => {
        this.setState({ transactions });
      });
  }

  handleEndEvent = () => {
    if (window.confirm("Are you sure you want to DELETE  all transactions?")) {
      db.transaction("rw", db.transactions, function() {
        let deleteCount = db.transactions.clear();
        console.log("Successfully deleted " + deleteCount + " items");
      }).catch(e => {
        console.error(e);
      });
    }
  };
  render() {
    const { transactions } = this.state;
    const zero = transactions.length === 0;
    const totalSales = transactions
      .map(t => t.total)
      .reduce((accum, curr) => accum + curr, 0);
    return (
      <React.Fragment>
        <nav className="navbar sticky-top navbar-light bg-light">
          <a className="navbar-brand">SimplePOS</a>
          <table>
            <thead>
              <tr>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${totalSales}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={this.handleEndEvent}
            disabled={zero}
            className="btn btn-danger btn-md m-2"
          >
            Delete All Transactions
          </button>
          <Link to="/" className="btn btn-primary btn-sm m-2">
            Back to POS
          </Link>
        </nav>
        <TransactionsTable transactions={transactions} />
      </React.Fragment>
    );
  }
}
export default Transactions;
