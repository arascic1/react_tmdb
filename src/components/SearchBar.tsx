import React from 'react';
import './css/search_bar.css';

const SearchBar = () => {
  return (
    <div id = "searchBarDiv">
        <input id = "searchBar" type = "text" placeholder = "Search..."></input>
    </div>
  )
}

export default SearchBar