import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transactions: [],
    searchTerm: ""
  }

  componentDidMount() {
    fetch('http://localhost:6001/transactions')
      .then(response => response.json())
      .then(transactions => {
        this.setState({ transactions: transactions.reverse() })
      })
  }

  addTransaction = (transaction) => {
    this.setState({ 
      transaction: [transaction, ...this.state.transactions]
    })
  }

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  filteredTransactions = () => {
    return this.state.transactions.filter(transaction => (transaction.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())))
  }

  render() {
    console.log(this.filteredTransactions())
    return (
      <div>
        <Search searchTerm={this.state.searchTerm} handleSearch={this.handleSearch}/>
        <AddTransactionForm addTransaction={this.addTransaction}/>
        <TransactionsList transactions={this.filteredTransactions()}/>
      </div>
    );
  }
}

export default AccountContainer;
