import React from "react";
import Transaction from "./Transaction";
import apiEndpoints from '../config/ApiEndpoints';

class TransactionsList extends React.Component {

  state = {
    transactions: [],
    transactionsLoaded: false,
    transactionAddedWithId: null,
    sortByDescription: null,
    sortByCategory: null,
  }

  componentDidMount() {
    this.fetchAllTransactions();
  }

  componentDidUpdate() {
    if (this.props.newTransaction && this.props.newTransaction.id !== this.state.transactionAddedWithId){
      // add the transaction to the array in state
      this.setState(prevState => ({
        transactions: [this.props.newTransaction, ...prevState.transactions],

        // need this to prevent the transaction from being added twice, 
        // before the parent's state changes with newTransactionSavedToState()
        // and the newTransaction prop is cleared.
        transactionAddedWithId: this.props.newTransaction.id,
      }), () => {
        // let the parent know it's done
        this.props.newTransactionSavedToState()
        // clear the transactionAddedWithId
        this.setState({ transactionAddedWithId: null })
      });
    }
  }

  fetchAllTransactions() {
    fetch(apiEndpoints.transactions)
      .then(r => r.json())
      .then(fetchtedTransactions => {
        this.setState({
          transactions: fetchtedTransactions,
          transactionsLoaded: true,
        });
      })
  }

  sortedTransactions() {
    return [...this.state.transactions].sort((txA, txB) => {
      if (this.state.sortByDescription) {
        if (txA.description.toLowerCase() > txB.description.toLowerCase()) {
          return 1 * this.state.sortByDescription;
        } else if (txA.description.toLowerCase() < txB.description.toLowerCase()) {
          return -1 * this.state.sortByDescription;
        } else {
          return 0;
        }
      } else if (this.state.sortByCategory) {
        if (txA.category.toLowerCase() > txB.category.toLowerCase()) {
          return 1 * this.state.sortByCategory;
        } else if (txA.category.toLowerCase() < txB.category.toLowerCase()) {
          return -1 * this.state.sortByCategory;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
  }

  filteredTransactions() {
    return this.sortedTransactions().filter(transaction => {
      return transaction.description.toLowerCase().includes(this.props.searchString.toLowerCase());
    });
  }

  generateTransactionComponents() {
    return this.filteredTransactions().map(transaction => {
      return <Transaction key={transaction.id} transaction={transaction} />
    });
  }

  toggleSortByDescription = () => {
    this.setState({
      sortByDescription: 1,
      sortByCategory: null,
    });
  }

  toggleSortByCategory = () => {
    this.setState({
      sortByDescription: null,
      sortByCategory: 1,
    });
  }

  render() {
    console.log('TL rendered:', this.props, this.state)

    return (
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th className='clickable' onClick={this.toggleSortByDescription}>
              <h3 className="ui center aligned header">Description (click to sort)</h3>
            </th>
            <th className='clickable' onClick={this.toggleSortByCategory}>
              <h3 className="ui center aligned header">Category (click to sort)</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
          </tr>
          {
            this.state.transactionsLoaded ?
              this.generateTransactionComponents()
            :
              <tr><td></td><td>Transactions loading....</td><td></td><td></td></tr>
          }
        </tbody>
      </table>
    );
  }  
};

export default TransactionsList;
