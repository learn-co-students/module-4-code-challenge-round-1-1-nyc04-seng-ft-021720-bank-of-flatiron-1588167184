import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  state = {
    transactions: [],
    searchTerm: "",
    sortByCategory: false,
    sortByDescription: false
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

  toggleSortByDescription = () => {
    this.setState(prevState => ({
      sortByDescription: !prevState.sortByDescription
    }))
  }

  toggleSortByCategory = () => {
    this.setState(prevState => ({
      sortByCategory: !prevState.sortByCategory
    }))
  }

//   getSortedResults = (transactions) => {
//     let filteredTransactions = [...transactions]
//     // if (this.state.sortByCategory && this.state.sortByDescription){
//     //   return filteredTransactions = filteredTransactions.sort((a, b) => {
//     //     return a.category.localeCompare(b.category)
//     //   })
//       // return filteredTransactions.sort((a, b) => {
//       //   return (a.description.localeCompare(b.description))
//       // })
//     // } else 
//     if (this.state.sortByDescription){
//       filteredTransactions.sort((a, b) => {
//         return (a.description.localeCompare(b.description))
//       })
//       return filteredTransactions
//     } else if (this.state.sortByCategory){
//       filteredTransactions = filteredTransactions.sort((a, b) => {
//         return a.category.localeCompare(b.category)
//       })
//     return filteredTransactions
//   }
// }

  render() {
    const filteredTransactions = this.filteredTransactions()
    // const sortedTransactions = this.getSortedResults(filteredTransactions)
    return (
      <div>
        {/* {console.log(sortedTransactions)} */}
        <Search searchTerm={this.state.searchTerm} handleSearchUpdate={this.handleSearchUpdate} 
        toggleSortByDescription={this.toggleSortByDescription} toggleSortByCategory={this.toggleSortByCategory}/>
        <AddTransactionForm addTransaction={this.addTransaction}/>
        <TransactionsList transactions={filteredTransactions}/>
      </div>
    );
  }
}

export default AccountContainer;
