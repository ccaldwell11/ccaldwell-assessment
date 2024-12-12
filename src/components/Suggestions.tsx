import React from 'react';

const SuggestionsList = ({ suggestions, handleAddressClick }) => {
  return (
    <ul>
      {suggestions.map((suggestion, index) => (
        <li 
          key={index} 
          onClick={() => handleAddressClick(suggestion)}
          style={{ cursor: 'pointer' }}
        >
          {suggestion.address || 'address does not exist'}
        </li>
      ))}
    </ul>
  )
}

export default SuggestionsList;