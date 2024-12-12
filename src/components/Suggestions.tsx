import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

interface Suggestion {
  address: string;
  coordinates?: [number, number];
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
  handleAddressClick: (suggestion: Suggestion) => void;
  loading: boolean
}
const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  handleAddressClick,
  loading
}) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      border={'0.5px solid'}
      borderColor={'gray.300'}
      borderRadius={'md'}
      p={7}
      height={'100%'}
      textAlign={'center'}
    >
      {loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <Spinner size="lg" color="red.500" />
          </Box>
        )}
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
  );
};

export default SuggestionsList;
