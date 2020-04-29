import React from "react";

const Transaction = (props) => {

  const { id, date, description, category, amount } = props.transaction;
  const { deleteTransaction } = props

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount ? amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' }) : 'unknown'}</td>
      <td className='delete-button' onClick={() => deleteTransaction(id)}>X</td>
    </tr>
  );
};

export default Transaction;
