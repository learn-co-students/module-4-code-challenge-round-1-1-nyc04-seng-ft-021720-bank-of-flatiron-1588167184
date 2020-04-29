import React from "react";

const Transaction = (props) => {

  const { date, description, category, amount } = props

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default Transaction;

// ********** TRANSACTION SAMPLE DATA ********* //
// id: 1,
// date: "2019-12-01",
// description: "Paycheck from Bob's Burgers",
// category: "Income",
// amount: 1000