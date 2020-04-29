import React from "react";

const Search = (props) => {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        // value={props.searchTerm}
        placeholder={"Search your Recent Transactions"}
        onChange={(event) => {
          props.handleSearchUpdate(event.target.value)
        }}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;
