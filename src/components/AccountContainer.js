import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import apiEndpoints from '../config/ApiEndpoints';

class AccountContainer extends Component {

  state = {
    searchString: '',
    newTransaction: null,
  }

  handleSearchChange = (event) => {
    this.setState({
      searchString: event.target.value
    });
  }

  handleNewTransactionSubmission = (event) => {
    event.preventDefault();
    const { date, description, category, amount } = event.target.elements;
    const newTransactionObject = { 
      date: date.value, 
      description: description.value, 
      category: category.value, 
      amount: parseFloat(amount.value), 
    }
    // debugger;
    this.addNewTransaction(newTransactionObject);
  }

  addNewTransaction(newTransaction) {
    fetch(apiEndpoints.transactions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTransaction)
    })
      .then(r => r.json())
      .then(newlyAddedTransaction => this.setState({
        newTransaction: newlyAddedTransaction
      }));
  }

  newTransactionSavedToState = () => {
    // the transaction was successfully added to the transaction array, and can be cleared from state
    this.setState({ newTransaction: null });
  }

  render() {
    return (
      <div>
        <Search searchString={this.state.searchString} handleSearchChange={this.handleSearchChange} />
        <AddTransactionForm handleNewTransactionSubmission={this.handleNewTransactionSubmission} />
        <TransactionsList searchString={this.state.searchString} newTransaction={this.state.newTransaction} newTransactionSavedToState={this.newTransactionSavedToState} />
      </div>
    );
  }
}

export default AccountContainer;
