import React from "react";

const Transaction = ({transaction, deleter}) => {
  return (
    <>
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>${transaction.amount}</td>
    </tr>
    <button className="ui button" type="button" onClick={()=>deleter(transaction)} >
    Delete          
    </button>
    </>
  );
};

export default Transaction;
