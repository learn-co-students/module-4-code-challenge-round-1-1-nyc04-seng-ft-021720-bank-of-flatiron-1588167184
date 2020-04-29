import React, { Component } from "react";
import AccountContainer from "./AccountContainer";
import "../stylesheets/App.css";

class App extends Component {

  state = {
    transations: [],
    searchTerm: ""
  }

componentDidMount () {
  fetch("http://localhost:6001/transactions")
  .then (r => r.json())
  .then (arrayOfTransations => {
      this.setState({transations: arrayOfTransations})
  })
}

changeSearchTerm = (newTerm) => {
  this.setState({
    searchTerm: newTerm
  })
}

functionFilterArray = () => {
  let filterOfArray = this.state.transations.filter((transactionPojo) => {
    return transactionPojo.description.toLowerCase().includes(this.state.searchTerm.toLowerCase())
  })
  return filterOfArray
}

addOneTransaction = (newTransaction) => {
  fetch("http://localhost:6001/transactions", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newTransaction)
})
  .then(r => r.json())
  .then((newTrans) => {

    let newInput = [...this.state.transations, newTrans]
    this.setState({
      transations: newInput
    })
  })
}

  render() {
    // console.log(this.state.transations)
    return (
      <div className="ui raised segment">
        <div className="ui segment violet inverted">
          <h2>The Royal Bank of Flatiron</h2>
        </div>
        <AccountContainer 
          // arrayOfTransations={this.state.transactions}
          arrayOfTransations={this.functionFilterArray()}
          addOneTransaction={this.addOneTransaction}
          searchTerm={this.state.searchTerm}
          changeSearchTerm={this.changeSearchTerm}
        />
      </div>
    );
  }
}




export default App;
