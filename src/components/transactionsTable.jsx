import React, { Component } from "react";
import Table from "./table";
import { Link } from "react-router-dom";

class TransactionsTable extends Component {
  columns = [
    { path: "id", label: "Transaction ID" },
    { path: "total", label: "Total Charge" }
  ];

  render() {
    const { transactions } = this.props;

    const totalSales = this.props.transactions
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
          <Link to="/pointofsale" className="btn btn-primary btn-sm m-2">
            Back to POS
          </Link>
        </nav>

        <Table columns={this.columns} data={transactions} />
      </React.Fragment>
    );
  }
}

export default TransactionsTable;
