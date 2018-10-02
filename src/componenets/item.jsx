import React, { Component } from "react";

class Item extends Component {
  // constructor() {
  //   super();
  //   this.handleIncrement = this.handleIncrement.bind(this);
  // }

  render() {
    const zero = this.props.item.value === 0;
    return (
      <div className="card m-1">
        <div className="card-body text-center">
          <h5 className="card-title">{this.props.item.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            ${this.props.item.price}{" "}
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </h6>
          <button
            onClick={() => this.props.onIncrement(this.props.item)}
            className="btn btn-secondary btn-lg"
          >
            +
          </button>
          <button
            disabled={zero}
            onClick={() => this.props.onDecrement(this.props.item)}
            className="btn btn-secondary btn-lg m-2"
          >
            -
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.item.id)}
            className="btn btn-danger btn-lg"
          >
            X
          </button>
        </div>
      </div>

      // <div className="row">
      //   <div className="col-sm-9">
      //     <h4>
      //       {this.props.item.name} ${this.props.item.price}
      //     </h4>
      //     <div className="row">
      //       <div className="col col-sm-1">
      //         <span className={this.getBadgeClasses()}>
      //           {this.formatCount()}
      //         </span>
      //       </div>
      //       <div className="col">
      //         <button
      //           onClick={() => this.props.onIncrement(this.props.item.)}
      //           className="btn btn-secondary btn-sm"
      //         >
      //           +
      //         </button>
      //         <button
      //           disabled={zero}
      //           onClick={() => this.props.onDecrement(evenItems)}
      //           className="btn btn-secondary btn-sm m-2"
      //         >
      //           -
      //         </button>
      //         <button
      //           onClick={() => this.props.onDelete(this.props.item.id)}
      //           className="btn btn-danger btn-sm"
      //         >
      //           X
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // </div> */}
    );
  }
  getBadgeClasses() {
    let classes = "badge badge-";
    classes += this.props.item.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.item;
    return value === 0 ? "Zero" : value;
  }
}

export default Item;
