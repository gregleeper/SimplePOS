import React, { Component } from "react";

// similar to items.jsx except that we only need item name, price, and a delete button rendered
// used in addItem.jsx and addItemItems.jsx
class Item extends Component {
  render() {
    const { onDelete, item } = this.props;
    return (
      <div className="card m-1">
        <div className="card-body text-center" key={item.id}>
          <h5 className="card-title">{item.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${item.price}</h6>
          <button
            onClick={() => onDelete(item.id)}
            className="btn btn-danger btn-lg"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default Item;
