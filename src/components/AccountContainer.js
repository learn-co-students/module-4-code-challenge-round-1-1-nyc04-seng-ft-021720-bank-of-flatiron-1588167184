// See a table of the transactions - COMPLETE

// Fill out and submit the form to add a new transaction. This should add a the new transaction to the table as well as post the new transaction to the backend API for persistence - COMPLETE

// Filter transactions by typing into the search bar. Only transactions with a description matching the search term should be shown in the transactions table - COMPLETE

import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

const API = "http://localhost:6001/transactions"

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: '',
  }

  componentDidMount() {
    fetch(API)
    .then(r => r.json())
    .then(transactions => {
      this.setState({
        transactions: transactions
      })
    });
  }

  handleSubmit = (newEntry, event) => {
    event.preventDefault();
    fetch(API, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newEntry)
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        this.setState({ transactions: [data,...this.state.transactions] })
      });
  }

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Search onChange={this.handleSearch} />
        <AddTransactionForm 
          onSubmit={this.handleSubmit} 
          onChange={this.handleChange} 

        />
        <TransactionsList transactions={this.state.transactions} searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default AccountContainer;