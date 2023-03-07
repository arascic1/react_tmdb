import React, { useState } from 'react'
import GenreSelector from './subcomponents/GenreSelector'
import ItemGrid from './subcomponents/ItemGrid'
import SearchBar from './subcomponents/SearchBar'

export const Homepage = () => {
  const [regime, setRegime] = useState('tv_initial')
  
  return (
    <>
      <GenreSelector setRegime={setRegime} />
      <SearchBar regime={regime}/>
      <ItemGrid regime={regime}/>
    </>
  )
}