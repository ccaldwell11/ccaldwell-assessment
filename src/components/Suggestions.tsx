import React from 'react';

const SuggestionsList = ({ suggestions, handleAddressClick }) => {
  return (
    <ul>
      {suggestions.map((suggestion, index: number) => (
        <h3 
          key={index} 
          onClick={() => handleAddressClick(suggestion)}
          style={{ cursor: 'pointer' }}
        >
          {suggestion.address || 'address does not exist'}
        </h3>
      ))}
    </ul>
  )
}

export default SuggestionsList;