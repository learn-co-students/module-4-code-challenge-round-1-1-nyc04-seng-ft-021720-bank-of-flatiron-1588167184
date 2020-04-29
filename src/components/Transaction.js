import React from "react";

const Transaction = (props) => {
  return (
    <tr>
      <td name="date">{props.info.date}</td>
      <td name="description">{props.info.description}</td>
      <td name="category">{props.info.category}</td>
      <td name="amount">{props.info.amount}</td>
    </tr>
  );
};

export default Transaction;
