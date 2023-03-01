import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GenreSelector from './components/GenreSelector'
import SearchBar from './components/SearchBar'
import ItemGrid from './components/ItemGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <GenreSelector />
      <SearchBar />
      <ItemGrid />
    </div>
  )
}

export default App
