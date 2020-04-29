import React, { Component } from "react";

class AddTransactionForm extends Component {

  


  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit = {this.props.submit}>
          <div className="inline fields">
            <input type="date" name="date" value ={this.props.values.date} onChange={this.props.onChange}/>
            <input type="text" name="description" placeholder="Description" 
            value ={this.props.values.description}
            onChange={this.props.onChange}
            />
            <input type="text" name="category" placeholder="Category" 
            value ={this.props.values.category}
            onChange={this.props.onChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              value ={this.props.values.amount}
              onChange={this.props.onChange}
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
        <button className="ui button" type="button" onClick={this.props.sortCategory}>
            Categorically
          </button>
          <button className="ui button" type="button" onClick={this.props.sortDescription}>
            Description
          </button>
      </div>
    );
  }
}

export default AddTransactionForm;
