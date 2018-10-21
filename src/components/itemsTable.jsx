import React, { Component } from "react";
import Table from "./table";

class ItemsTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "qty", label: "Quantity" },
    { path: "price", label: "Price" }
  ];

  render() {
    const { items } = this.props;
    return <Table columns={this.columns} data={items} />;
  }
}

export default ItemsTable;
