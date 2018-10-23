import React, { Component } from "react";
import Item from "./itemAddItems";

// similar to items.jsx except that we don't need to the increment and decrement
// and clear operators
// used in addItems.jsx
class Items extends Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.items.map(item => (
          <Item
            key={item.id}
            names={this.props.items.name}
            price={this.props.items.price}
            item={item}
            onDelete={this.props.onDelete}
          />
        ))}
      </div>
    );
  }
}

export default Items;
