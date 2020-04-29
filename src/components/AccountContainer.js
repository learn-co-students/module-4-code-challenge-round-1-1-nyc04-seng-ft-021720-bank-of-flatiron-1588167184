import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

const BASE_URL = 'http://localhost:6001/transactions/'
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
    fetch(BASE_URL)
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
        return (t1.category).localeCompare(t2.category)
      })
    }
    

    if(this.state.description){
      sortedTransactions.sort((t1, t2) => {
        return (t1.description).localeCompare(t2.description)
      })
    }
    


    return sortedTransactions
  }

  onSubmit = (e) =>{
    e.preventDefault()
    let {date, description, category, amount} = this.state.form
    fetch(BASE_URL, {
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
      category: !prevState.category,
      description: false
    }))
  }

  sortClickDescription = (e) =>{
    this.setState((prevState) => ({
      description: !prevState.description
    }))
  }

  onClickDelete = (transactionObj) =>{
    let transactionID = transactionObj.id 

    fetch(BASE_URL+transactionID, {
      method: 'delete'
    })
    .then(response => response.json())
    .then(obj => {
      let oldState = [...this.state.transactions]
      let newState = oldState.filter(transactions => transactions !== transactionObj)
      this.setState({
        transactions: newState
      })
    })
  }


  render() {
    return (
      <div>
        <Search search={this.state.search} onChange={this.searchOnChange}/>
        <AddTransactionForm submit={this.onSubmit} values ={this.state.form} 
        onChange={this.formOnChange} sortCategory={this.sortClickCategory}
        sortDescription={this.sortClickDescription}/>
        <TransactionsList transactions = {this.state.transactions} test ={this.sortTransactions()} delete={this.onClickDelete}/>
      </div>
    );
  }
}

export default AccountContainer;
