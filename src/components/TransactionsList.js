import React from "react";
import Transaction from "./Transaction";
import apiEndpoints from '../config/ApiEndpoints';

class TransactionsList extends React.Component {

  state = {
    transactions: [],
    transactionsLoaded: false,
    transactionAddedWithId: null,
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

  filteredTransactions() {
    return this.state.transactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(this.props.searchString.toLowerCase());
    });
  }

  generateTransactionComponents() {
    return this.filteredTransactions().map(transaction => {
      return <Transaction key={transaction.id} transaction={transaction} />
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
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
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
