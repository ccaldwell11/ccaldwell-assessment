import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import axios from 'axios';
import SuggestionsList from './components/Suggestions';
import Map from './components/Map';
import Info from './components/Info';

function App() {
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [parcelGeometry, setParcelGeometry] = useState<any | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [parcelInfo, setParcelInfo] = useState<any | null>(null);

  
  const fetchSuggestions = (query: string) => {
    if (!query) return;

    axios.get(`http://localhost:3002/address/suggestions?query=${query}`)
      .then((response) => {
        setSuggestions(response.data.slice(0, 7));
      })
      .catch((error) => {
        console.error('error fetching address suggestions', error);
      });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  }

  const handleSearch = () => {
    console.log(`searched for: ${address}`)

    if (address) {
      fetchSuggestions(address);
    } else {
      setSuggestions([]);
    }

    // setAddress('');
  }


  const handleAddressClick = (suggestion: any) => {
    console.log('selected', suggestion);
    const coordinates = suggestion.coordinates;

    if (coordinates && coordinates.length === 2) {
      const lat = coordinates[1];
      const long = coordinates[0];
      console.log('lat:', lat, 'long:', long);

      setSelectedLocation({ lat, long });
      fetchParcelGeometry(lat, long);
      fetchParcelInfo(long, lat);
    } else {
      console.error('invalid coordinates. please check them', coordinates);
    }
  };

  const fetchParcelGeometry = (lat: number, long: number) => {
    const url = `http://localhost:3002/parcel/geometry?lat=${lat}&long=${long}`;
  
    axios
      .get(url)
      .then((response) => {
        if (response.data && response.data.geometry) {
          const geometry = response.data.geometry;
          console.log('Setting parcel geometry:', geometry, response.data);
  
          setParcelGeometry((prev) => ({
            ...prev,
            ...geometry,
          }));
        }
      })
      .catch((error) => {
        console.error('error fetching parcel shape:', error);
      });
  };

  const fetchParcelInfo = (lat: number, long: number) => {
    const url = `http://localhost:3002/parcel/info?lat=${lat}&long=${long}`;
  
    axios.get(url).then(({data}) => {
        if (data && data.features && data.features.length > 0) {
          const info = data.features[0].attributes; 
          console.log('parcel info:', info);
          setParcelInfo(info); 
        }
      })
      .catch((error) => {
        console.error('error fetching parcel info:', error);
      });
  };
  

  return (
    <div>
      <h1>Spatial Data Visualization</h1>
      <Search handleInput={handleInput} handleSearch={handleSearch} address={address}/>
      <SuggestionsList suggestions={suggestions} handleAddressClick={handleAddressClick}></SuggestionsList>
      <Map selectedLocation={selectedLocation} parcelGeometry={parcelGeometry}></Map>
      <Info parcelInfo={parcelInfo}></Info>
    </div>
  )
}

export default App
