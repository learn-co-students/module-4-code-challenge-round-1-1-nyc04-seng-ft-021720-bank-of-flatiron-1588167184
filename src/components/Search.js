import React from "react";

const Search = (props) => {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder={"Search your Recent Transactions"}
        onChange={(event) => {
          props.handleSearchUpdate(event.target.value)
        }}
      />
      <i className="circular search link icon"></i>
      <label> Sort Alphabetically by Category</label>
      <input
      type="checkbox"
      onChange={props.toggleSortByCategory} 
      />
      <label> Sort Alphabetically by Description</label>
      <input
      type="checkbox"
      onChange={props.toggleSortByDescription} 
      />
    </div>
  );
};

export default Search;
