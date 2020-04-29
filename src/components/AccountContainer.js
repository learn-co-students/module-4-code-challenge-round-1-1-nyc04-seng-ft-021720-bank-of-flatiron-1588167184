import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  render() {
    return (
      <div>
        <Search />
        <AddTransactionForm
        addOneTransaction={this.props.addOneTransaction} />
        <TransactionsList 
        arrayOfTransations={this.props.arrayOfTransations}
        />
      </div>
    );
  }
}

export default AccountContainer;
