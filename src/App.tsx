import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import axios from 'axios';
import SuggestionsList from './components/Suggestions';
import Map from './components/Map';
import Info from './components/Info';
import { ChakraProvider, Grid, GridItem, Heading, Box } from '@chakra-ui/react';
import { defaultSystem } from '@chakra-ui/react';

interface Location {
  lat: number;
  long: number;
}

interface ParcelGeometry {
  rings: [number, number][][];
}

interface ParcelInfo {
  SITEADDRESS: string;
  OWNERNME1: string;
  ASS_DIMS: string;
  ASS_SQFT: string;
  PRPRTYDSCRP: string;
}

function App() {
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [parcelGeometry, setParcelGeometry] = useState<ParcelGeometry | null>(
    null
  );
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [parcelInfo, setParcelInfo] = useState<ParcelInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = (query: string) => {
    if (!query) return;
    setLoading(true); 
    axios
      .get(`https://ccaldwell-assessment-production.up.railway.app/address/suggestions?query=${query}`)
      .then((response) => {
        setSuggestions(response.data.slice(0, 7));
      })
      .catch((error) => {
        console.error('error fetching address suggestions', error);
      })
      .finally(() => setLoading(false));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleSearch = () => {
    if (address) {
      fetchSuggestions(address);
    } else {
      setSuggestions([]);
    }

    // setAddress('');
  };

  const handleAddressClick = (suggestion: any) => {
    const coordinates = suggestion.coordinates;

    if (coordinates && coordinates.length === 2) {
      const lat = coordinates[1];
      const long = coordinates[0];

      setSelectedLocation({ lat, long });
      fetchParcelGeometry(lat, long);
      fetchParcelInfo(long, lat);
    } else {
      console.error('invalid coordinates. please check them', coordinates);
    }
  };

  const fetchParcelGeometry = (lat: number, long: number) => {
    const url = `https://ccaldwell-assessment-production.up.railway.app/parcel/geometry?lat=${lat}&long=${long}`;

    axios
      .get(url)
      .then(({ data }) => {
        if (data && data.geometry) {
          // const geometry = data.geometry;

          setParcelGeometry({ rings: data.geometry.rings });
        }
      })
      .catch((error) => {
        console.error('error fetching parcel shape:', error);
      });
  };

  const fetchParcelInfo = (lat: number, long: number) => {
    const url = `https://ccaldwell-assessment-production.up.railway.app/parcel/info?lat=${lat}&long=${long}`;

    axios
      .get(url)
      .then(({ data }) => {
        if (data && data.features && data.features.length > 0) {
          const info = data.features[0].attributes;
          setParcelInfo(info);
        }
      })
      .catch((error) => {
        console.error('error fetching parcel info:', error);
      });
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Box w={'1100px'} mx={'auto'}>
        <Heading fontSize={'4xl'}>Spatial Data Test</Heading>
        <br></br>
        <Search
          handleInput={handleInput}
          handleSearch={handleSearch}
          address={address}
        />
        <Grid templateColumns={'3fr 4.5fr 3fr'} gap={4}>
          <GridItem
            border={'1px solid'}
            borderColor={'gray.200'}
            borderRadius={'md'}
            p={4}
            minHeight={'100%'}
          >
            <SuggestionsList
              suggestions={suggestions}
              handleAddressClick={handleAddressClick}
              loading={loading}
            ></SuggestionsList>
          </GridItem>

          <GridItem
            border={'1px solid'}
            borderColor={'gray.200'}
            borderRadius={'md'}
            p={4}
            minHeight={'100%'}
          >
            <Map
              selectedLocation={selectedLocation}
              parcelGeometry={parcelGeometry}
            ></Map>
          </GridItem>

          <GridItem
            border={'1px solid'}
            borderColor={'gray.200'}
            borderRadius={'md'}
            p={4}
            minHeight={'100%'}
          >
            <Info parcelInfo={parcelInfo}></Info>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
