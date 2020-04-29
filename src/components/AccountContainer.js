import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: ""
  }

  componentDidMount = () => {
    fetch('http://localhost:6001/transactions')
    .then(response => response.json())
    .then(transactionsArr => {
      this.setState({
        transactions: transactionsArr
      })
    });
  }

filteredTransactions = () => {
  let filteredTransactions = [...this.state.transactions]
  return filteredTransactions.filter(t => {
    return t.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())
  })
}

addTransaction = (transaction) => {
  fetch('http://localhost:6001/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  })
  .then(response => response.json())
  .then(transaction => {
    console.log('Success:', transaction);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
      this.setState(prevState => ({
        transactions: [...prevState.transactions, transaction]
      }),
  )}
  
  handleSearchUpdate = (newSearchTerm) => {
    this.setState({
      searchTerm: newSearchTerm
    })
  }

  render() {
    const filteredTransactions = this.filteredTransactions()
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleSearchUpdate={this.handleSearchUpdate}/>
        <AddTransactionForm addTransaction={this.addTransaction}/>
        <TransactionsList transactions={filteredTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
