import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './css/search_bar.css';

const SearchBar = () => {
  return (
    <div id = "searchBarDiv">
        <FontAwesomeIcon className="ikonica" icon={faMagnifyingGlass}/>
        <input id = "searchBar" type = "text" placeholder = "Search..."></input>
    </div>
  )
}

export default SearchBar