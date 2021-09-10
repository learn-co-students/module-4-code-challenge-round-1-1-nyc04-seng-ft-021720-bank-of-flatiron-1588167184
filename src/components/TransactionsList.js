import React from "react";
import Transaction from "./Transaction";

const TransactionsList = (props) => {
  
  let filteredTransactions = [...props.transactions]
    .filter(transaction => transaction.description.toLowerCase()
    .includes(props.searchTerm.toLowerCase()))

  let renderTransactions = filteredTransactions.map(transaction => {
    const { id, date, description, category, amount } = transaction
      return (
        <Transaction
          id={id} 
          key={id}
          date={date}
          description={description}
          category={category}
          amount={amount}
          handleDelete={props.handleDelete}
        />
      )
  })
  
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
          renderTransactions
        }
      </tbody>
    </table>
  );
};

export default TransactionsList;