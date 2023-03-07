import { Link } from 'react-router-dom';
import { useAppSelector } from '../../state/hooks';
import '../css/grid_item.css';
import { RegimeProp } from './SearchBar';

const imgBaseURL = 'https://image.tmdb.org/t/p/w780/'

const ItemGrid = (prop: RegimeProp) => {
    const content = useAppSelector(state => state.content)

    return (
        <>
        { content.loading && <div>Loading...</div> }
        
        { !content.loading && 
            content.error ? <div>Error: { content.error }</div> : null }
        
        { !content.loading && 
        content.data.length ?

        (<div className='itemContainer'>
        {(() => {
            const elements = []
            let minorUIFix = false

            for(let i = 0; i < content.data.length; i++) {
                const data = content.data[i]

                if(i % 2 == 0 && i != content.data.length - 1) {
                    if(data.title.length > 35 || content.data[i + 1].title.length > 35) minorUIFix = true
                    else minorUIFix = false
                }

                const regime = (prop.regime == 'movies') ? 'movie' : 'tv'

                elements.push(
                    <Link className = "a gridItem" key = {data.id} to = {`${regime}/${data.id}`}>
                        <div className='divSlike'>
                            <img className = "itemImage" alt = {data.title} src = {imgBaseURL + data.backdrop_path}></img>
                        </div>
                        <h1 className = {minorUIFix ? "title center" : "title"}>{data.title}</h1>
                    </Link>
                )
            }

            return elements
        })()}
        </div>)

        : null }
        </>
    )
}

export default ItemGrid