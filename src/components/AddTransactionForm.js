import React, { Component } from "react";

const formatDate = () => {
  let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const initialState = {
  date: formatDate(),
  description: "",
  category: "",
  amount: ""
}

class AddTransactionForm extends Component {

  state = initialState

  handleInput = (event) => {
    const input = event.target.name
    this.setState({
      [input]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:6001/transactions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(transaction => {
        this.props.addTransaction(transaction)
        this.setState(initialState)
      })
  }

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" value={this.state.date} onChange={this.handleInput}/>
            <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInput}/>
            <input type="text" name="category" placeholder="Category" value={this.state.category} onChange={this.handleInput}/>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.handleInput}
              step="0.01"
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;


