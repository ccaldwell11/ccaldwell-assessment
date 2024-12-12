import React from 'react';
import { Box, VStack, Flex, Heading } from '@chakra-ui/react';


const SuggestionsList = ({ suggestions, handleAddressClick }) => {
  return (
      <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border="0.5px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={7}
      height="100%"
      textAlign="center"
    >
        {suggestions.map((suggestion, index: number) => (
          <h2 
          key={index} 
          onClick={() => handleAddressClick(suggestion)}
          style={{ cursor: 'pointer' }}
          >
            {suggestion.address || 'address does not exist'}
          </h2>
        ))}
      </Box>
  )
}

export default SuggestionsList;