import React, { Component } from "react";
import Item from "./item";

class Items extends Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.items.map(item => (
          <Item
            key={item.id}
            names={this.props.items.name}
            price={this.props.items.price}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            onDecrement={this.props.onDecrement}
            item={item}
          />
        ))}
      </div>
    );
  }
}

export default Items;
