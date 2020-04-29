import React, { Component } from "react";

class AddTransactionForm extends Component {
  state = {
    amount: 0,
    description: "",
    date: Date(),
    category: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let transaction = {
      amount: this.state.amount,
      description: this.state.description,
      date: this.state.date,
      category: this.state.category
    }
    return this.props.addTransaction(transaction)
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form">
          <div className="inline fields">
            <input onChange={this.handleChange} type="date" name="date" />
            <input onChange={this.handleChange} type="text" name="description" placeholder="Description" />
            <input onChange={this.handleChange} type="text" name="category" placeholder="Category" />
            <input onChange={this.handleChange}
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
            />
          </div>
          <button onClick={this.handleSubmit} className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;
