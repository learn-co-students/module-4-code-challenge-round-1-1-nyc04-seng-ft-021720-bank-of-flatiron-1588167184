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
    search: "",
    category: false,
    description: false    
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

    if(this.state.category){
      sortedTransactions.sort((t1, t2) => {
        return (t1.category < t2.category ? -1 : (t1.category > t2.category ? 1 : 0));
      })
    }

    if(this.state.description){
      sortedTransactions.sort((t1, t2) => {
        return (t1.description < t2.description ? -1 : (t1.description > t2.description ? 1 : 0));
      })
    }
    


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

  sortClickCategory = (e) =>{
    this.setState((prevState) => ({
      category: !prevState.category
    }))
  }

  sortClickDescription = (e) =>{
    this.setState((prevState) => ({
      description: !prevState.description
    }))
  }


  render() {
    return (
      <div>
        <Search search={this.state.search} onChange={this.searchOnChange}/>
        <AddTransactionForm submit={this.onSubmit} values ={this.state.form} 
        onChange={this.formOnChange} sortCategory={this.sortClickCategory}
        sortDescription={this.sortClickDescription}/>
        <TransactionsList transactions = {this.state.transactions} test ={this.sortTransactions()} />
      </div>
    );
  }
}

export default AccountContainer;
