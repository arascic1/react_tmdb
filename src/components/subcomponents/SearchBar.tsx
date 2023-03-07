import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../css/search_bar.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { APIkey, fetchTopMovies, fetchTopTVShows, searchMovies, searchTV } from '../../state/slices/contentSlice';
import { useAppDispatch } from '../../state/hooks';

export type RegimeProp = {
  regime: string
}

const SearchBar = (props: RegimeProp) => {
  const [query, setQuery] = useState('')
  const searchMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&language=en-US&query=${query}&page=1&include_adult=false`
  const TVsearchURL = `https://api.themoviedb.org/3/search/tv?api_key=${APIkey}&language=en-US&page=1&query=${query}&include_adult=false`
  const dispatch = useAppDispatch()

  const [time, setTime] = useState(-1)
  const interval = useRef<number | null>(null)

  useEffect(() => {
    if(time == -1) {
      if(props.regime == 'tv') dispatch(fetchTopTVShows())
      else if(props.regime == 'movies') dispatch(fetchTopMovies())

      if(interval.current != null) window.clearInterval(interval.current)

      return
    }
    else if(time < 1 && interval.current != null) return

    if(props.regime == 'tv' || props.regime == 'tv_initial') {
      dispatch(searchTV(TVsearchURL))
    }
    else if(props.regime == 'movies') {
      dispatch(searchMovies(searchMovieURL))
    }

    setTime(0)
    if(interval.current != null) {
      window.clearInterval(interval.current)
      interval.current = null
    }
  }, [time, props.regime])

  function listener(event: ChangeEvent<HTMLInputElement>) {
    if(event.target.value.length < 3) {
      setTime(-1); // signal za default load
      return
    }

    setTime(0)
    if(interval.current != null) {
      window.clearInterval(interval.current)
      interval.current = null
    }

    interval.current = window.setInterval(() => {
      setTime((time) => time + 1)
    }, 1000)

    setQuery(event.target.value)
  }

  return (
    <div id = "searchBarDiv">
      <FontAwesomeIcon className="ikonica" icon={faMagnifyingGlass}/>
      <input 
        id = "searchBar" 
        type = "text" 
        placeholder = "Search..."
        onChange={listener}></input>
    </div>
  )
}

export default SearchBar