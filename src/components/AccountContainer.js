import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transactions: [],
    allTransactions: []
  }

  componentDidMount(){
    fetch("http://localhost:6001/transactions")
      .then(r => r.json())
      .then(data => this.setState({transactions: data, allTransactions: data}))
  }

  handleAddTransaction = (e) => {
    debugger
    e.preventDefault()
    let transactionObj = {
      id: this.state.transactions.length + 1,
      date: e.target.date.value,
      description: e.target.description.value,
      category: e.target.category.value,
      amount: e.target.amount.value
    }
    let requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(transactionObj)
    }
    
    fetch("http://localhost:6001/transactions", requestOptions)
      .then(r=>r.json())
      .then(data => {
        console.log("Post successful!")
        this.setState({
          transactions: [...this.state.transactions, transactionObj],
          allTransactions: [...this.state.transactions, transactionObj]
        })
      })
  }

  
  // this.setState({
    //   searchTerm: e.target.value
    // })
    // console.log(this.state.searchTerm)
    // let filteredTransactions = this.state.transactions.filter(transaction => {
      //   return transaction.description.toLowerCase().includes(this.state.searchTerm).toLowerCase()
      // })
      // console.log(filteredTransactions)
  filterAllTransactions = (e) => {
    let searchTerm = e.target.value.toLowerCase()
    return this.state.allTransactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(searchTerm)
    })
  }

  handleSearch = (e) => {
    if (this.filterAllTransactions(e).length > 0){
      this.setState({transactions: this.filterAllTransactions(e)})
    } else {
      this.setState({ transactions: this.state.allTransactions })
    }
  }

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch}/>
        <AddTransactionForm handleAddTransaction={this.handleAddTransaction}/>
        <TransactionsList transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default AccountContainer;
