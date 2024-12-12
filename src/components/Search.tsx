import { Button, Grid, GridItem, Input } from '@chakra-ui/react';
import React from 'react'; 

interface SearchProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  address: string;
}

const Search: React.FC<SearchProps> = ({handleInput, handleSearch, address}) => {
  // address being searched for
  

  return (
    <Grid templateColumns={'6fr 1fr'}
    gap={3}>

<GridItem>

        <Input size={'sm'} placeholder={'Search for address'} color={'red.500'} onChange={handleInput} value={address}></Input>
</GridItem>


        <Button color={'white'} bgColor={'red.500'} onClick={handleSearch} outlineColor={'red.500'}>Search</Button>
<GridItem>

</GridItem>
    </Grid>
  )

}

export default Search;