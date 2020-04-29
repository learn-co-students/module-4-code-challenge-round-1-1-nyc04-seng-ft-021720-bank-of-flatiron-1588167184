import React from "react";

const Transaction = (props) => {

  const {date, description, category, amount, id} = props.transaction

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td onClick={() => props.handleDelete(id)}>Delete</td>
    </tr>
  );
};

export default Transaction;
