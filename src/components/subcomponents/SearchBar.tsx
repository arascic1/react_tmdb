import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../css/search_bar.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { APIkey, fetchTopMovies, fetchTopTVShows, searchMovies, searchTV } from '../../state/slices/contentSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setQuery as setSessionQuery } from '../../state/slices/sessionSlice'; 

export type RegimeProp = {
  regime: string
}

const SearchBar = (props: RegimeProp) => {
  const [query, setQuery] = useState('')
  const dispatch = useAppDispatch()
  const session = useAppSelector(state => state.session)
  
  const searchMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&language=en-US&query=${query}&page=1&include_adult=false`
  const TVsearchURL = `https://api.themoviedb.org/3/search/tv?api_key=${APIkey}&language=en-US&page=1&query=${query}&include_adult=false`
  
  const customSearchMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&language=en-US&query=${session.query}&page=1&include_adult=false`
  const customTVsearchURL = `https://api.themoviedb.org/3/search/tv?api_key=${APIkey}&language=en-US&page=1&query=${session.query}&include_adult=false`

  const [time, setTime] = useState(-1)
  const interval = useRef<number | null>(null)
  let sessionRestored = false

  useEffect(() => {
    if(session.query != '') {
      sessionRestored = true

      if(props.regime == 'tv' || props.regime == 'tv_initial') { 
        dispatch(searchTV(customTVsearchURL))
      }
      else if(props.regime == 'movies') {
        dispatch(searchMovies(customSearchMovieURL))
      }

      setQuery(session.query)
    }
    else sessionRestored = false
  }, [])

  useEffect(() => {
    if(time == -1 && !sessionRestored) {
      if(props.regime == 'tv') dispatch(fetchTopTVShows())
      else if(props.regime == 'movies') dispatch(fetchTopMovies())

      if(interval.current != null) window.clearInterval(interval.current)

      dispatch(setSessionQuery(''))

      return
    }
    else if(time < 1 && interval.current != null) return

    if(props.regime == 'tv' || props.regime == 'tv_initial') {
      if(query != '') {
        dispatch(searchTV(TVsearchURL))
        dispatch(setSessionQuery(query))
      }
    }
    else if(props.regime == 'movies' && query != '') {
      dispatch(searchMovies(searchMovieURL))
      dispatch(setSessionQuery(query))
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
        onChange={listener}
        defaultValue={query}></input>
    </div>
  )
}

export default SearchBar