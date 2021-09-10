// ************* CORE DELIVERABLES ******************** //

// See a table of the transactions - COMPLETE

// Fill out and submit the form to add a new transaction. This should add a the new transaction to the table as well as post the new transaction to the backend API for persistence - COMPLETE

// Filter transactions by typing into the search bar. Only transactions with a description matching the search term should be shown in the transactions table - COMPLETE

// ************* ADVANCED DELIVERABLES ******************** //

// Sort transactions alphabetically by category or description

// Delete a transaction which will remove it from the table and delete it from the backend - COMPLETE

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

  handleDelete = (id) => {
    fetch(API + "/" + id, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const newTransactions = this.state.transactions.filter(transaction => {
        return id !== transaction.id
      })
      this.setState({
        transactions: newTransactions
      })
    })
  }

  handleDeletePlaneteer = id => {
    fetch(API + '/' + id, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const newPlaneteers = this.state.planeteers.filter(planeteer => {
        return id !== planeteer.id
      })
      this.setState({
        planeteers: newPlaneteers
      })
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
        <TransactionsList 
          transactions={this.state.transactions} 
          searchTerm={this.state.searchTerm} 
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default AccountContainer;