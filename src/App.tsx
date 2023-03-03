import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GenreSelector from './components/GenreSelector'
import SearchBar from './components/SearchBar'
import ItemGrid from './components/ItemGrid'

function App() {
  const [regime, setRegime] = useState('tv_initial')

  return (
    <div className="App">
      <GenreSelector setRegime={setRegime} />
      <SearchBar regime={regime}/>
      <ItemGrid />
    </div>
  )
}

export default App
