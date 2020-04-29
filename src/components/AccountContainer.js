import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {

  state = {
    transactions: [],
    form:{
    date: "",
    description: "",
    category: "",
    amount: 0
    },
    search: ""
  }

  componentDidMount(){
    fetch('http://localhost:6001/transactions')
    .then(r => r.json())
    .then(transactions => this.setState({
      transactions:transactions
    }))
  }


  sortTransactions(){
    let sortedTransactions = [...this.state.transactions]



    sortedTransactions = sortedTransactions.filter(transactions => {
     return transactions.description.toLowerCase().includes(this.state.search.toLowerCase())}
      )
      
    return sortedTransactions
  }

  onSubmit = (e) =>{
    e.preventDefault()
    let {date, description, category, amount} = this.state.form
    fetch('http://localhost:6001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date, description, category, amount
      }),
    })  
    .then(r => r.json())
    .then(obj => 
      this.setState((prevState) => ({
        transactions: [...prevState.transactions, obj]
      }))
    )
  }


  formOnChange = (e) =>{
    let oldState = {...this.state}
    oldState["form"][e.target.name] = e.target.value
    this.setState(oldState)

  }

  searchOnChange = (e) =>{
    this.setState({search: e.target.value})
  }


  render() {
    return (
      <div>
        <Search search={this.state.search} onChange={this.searchOnChange}/>
        <AddTransactionForm submit={this.onSubmit} values ={this.state.form} onChange={this.formOnChange}/>
        <TransactionsList transactions = {this.state.transactions} test ={this.sortTransactions()} />
      </div>
    );
  }
}

export default AccountContainer;
