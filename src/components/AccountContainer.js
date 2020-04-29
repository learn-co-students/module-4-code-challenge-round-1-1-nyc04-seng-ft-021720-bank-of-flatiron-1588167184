import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

const BASEURL = 'http://localhost:6001/transactions'

class AccountContainer extends Component {

  state = {
    transactions: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch(BASEURL)
    .then(r => r.json())
    .then(transactionArr => {
      this.setState({
        transactions: transactionArr
      })
    })
  }

  onChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
    console.log(this.state.searchTerm)
  }

    
  searchTransactions() {
    let transactionsFiltered = [...this.state.transactions]
    return transactionsFiltered.filter(transaction => {
      return transaction.description.includes(this.state.searchTerm)
    })

  }
  
  updateTransactions = (newTransaction) => {
    this.setState({
      transactions: [...this.state.transactions, newTransaction]
    })
  }
    

  render() {
    return (
      <div>
        <Search onChange={this.onChange} searchTerm={this.state.searchTerm}/>
        <AddTransactionForm updateTransactions={this.updateTransactions}/>
        <TransactionsList transactions={this.searchTransactions()}/>
      </div>
    );
  }
}

export default AccountContainer;
