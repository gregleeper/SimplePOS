import React, { Component } from "react";

class Item extends Component {
  render() {
    const zero = this.props.item.qty === 0;
    const { onIncrement, onDecrement, onDelete, item } = this.props;
    return (
      <div className="card m-1">
        <div className="card-body text-center">
          <h5 className="card-title">{item.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            ${item.price}{" "}
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </h6>
          <button
            onClick={() => onIncrement(item.id, item.qty)}
            className="btn btn-secondary btn-lg"
          >
            +
          </button>
          <button
            disabled={zero}
            onClick={() => onDecrement(item.id, item.qty)}
            className="btn btn-secondary btn-lg m-2"
          >
            -
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="btn btn-danger btn-lg"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
  getBadgeClasses() {
    let classes = "badge badge-";
    classes += this.props.item.qty === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { qty } = this.props.item;
    return qty === 0 ? "Zero" : qty;
  }
}

export default Item;
