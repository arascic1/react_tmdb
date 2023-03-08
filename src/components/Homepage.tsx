import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../state/hooks'
import GenreSelector from './subcomponents/GenreSelector'
import ItemGrid from './subcomponents/ItemGrid'
import SearchBar from './subcomponents/SearchBar'

export const Homepage = () => {
  const session = useAppSelector(state => state.session)
  const [regime, setRegime] = useState(session.type != '' ? session.type :'tv_initial')
  
  return (
    <>
      <GenreSelector setRegime={setRegime} regime={regime} />
      <SearchBar regime={regime}/>
      <ItemGrid regime={regime}/>
    </>
  )
}