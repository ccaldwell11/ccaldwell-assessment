import { useState } from 'react'
import './App.css'
import Search from './components/Search'

function App() {
  const [address, setAddress] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }

  const handleSearch = () => {
    console.log(`searched for: ${address}`)
    setAddress('');
  }

  return (
    <div>
      <h1>Spatial Data Visualization</h1>
      <Search handleInput={handleInput} handleSearch={handleSearch} address={address}/>
    </div>
  )
}

export default App
