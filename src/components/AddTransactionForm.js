import React, { Component } from "react";



let defaultTransactionState = {
  date: '',
  description: '',
  category: '',
  amount: ''
}

let BASEURL = 'http://localhost:6001/transactions'

class AddTransactionForm extends Component {

  constructor() {
    super()
    this.state= defaultTransactionState

  }

  inputHandler = event => {
    const inputData = event.target.name
    this.setState({
      [inputData]: event.target.value
    })
  }


  submitTransaction = (event) => {
    event.preventDefault()
  
    fetch(BASEURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state),
    })
      .then(r => r.json())
      .then(newTransaction => {
        this.props.updateTransactions(newTransaction)
        this.setState(defaultTransactionState)
  })
  }
  

  /* BIO BREAK BRB */

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.submitTransaction} className="ui form">
          <div className="inline fields">
            <input type="date" name="date" onChange={this.inputHandler} />
            <input type="text" name="description" placeholder="Description" onChange={this.inputHandler} />
            <input type="text" name="category" placeholder="Category" onChange={this.inputHandler}b/>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
              onChange={this.inputHandler}
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
