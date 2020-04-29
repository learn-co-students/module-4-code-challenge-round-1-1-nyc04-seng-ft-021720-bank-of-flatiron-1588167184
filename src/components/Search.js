import React from "react";

const Search = ({search,onChange}) => {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        onChange={onChange}
        value={search}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;
