import React, {useState, useEffect} from 'react'; 

const Search = ({handleInput, handleSearch, address}) => {
  // address being searched for
  

  return (
    <div>
        <input type='text' onChange={handleInput} value={address} placeholder='Search'></input>
        <button onClick={handleSearch}>Search</button>
    </div>
  )

}

export default Search;