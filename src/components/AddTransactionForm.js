import React, { Component } from "react";

class AddTransactionForm extends Component {
  state = {
    date: '',
    description: '',
    category: '',
    amount: ''
  }

  handleChange = (event) => {
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    }, () => {console.log(this.state)})
  }

  render() {

    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={(event) => this.props.onSubmit(this.state, event)}>

          <div className="inline fields">
            <input type="date" name="date" 
              value={this.state.date} 
              onChange={this.handleChange}
            />
            <input type="text" name="description" 
              placeholder="Description" 
              value={this.state.description} 
              onChange={this.handleChange}
            />
            <input type="text" name="category" 
              placeholder="Category" 
              value={this.state.category} 
              onChange={this.handleChange}
            />
            <input type="number" name="amount"
              placeholder="Amount"
              step="0.01"
              value={this.state.amount}
              onChange={this.handleChange}
            />
          </div>
          <button className="ui button" type="submit">Add Transaction</button>

        </form>
      </div>
    );
  }
}

export default AddTransactionForm;