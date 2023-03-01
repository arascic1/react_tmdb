import React, { useEffect } from 'react'
import qm from '../res/qm.jpg';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchTopTVShows } from '../state/slices/contentSlice';
import './css/grid_item.css';

const imgBaseURL = 'https://image.tmdb.org/t/p/w780/'

const ItemGrid = () => {
    const content = useAppSelector(state => state.content)

    return (
        <>
            { content.loading && <div>Loading...</div> }
            
            { !content.loading && 
                content.error ? <div>Error: { content.error }</div> : null }
            
            { !content.loading && 
            content.data.length ?

            (<div className='itemContainer'>
                { content.data.map(data => (
                    <div className = "gridItem" key = {data.title}>
                        <div className='divSlike'>
                            <img className = "itemImage" alt = {data.title} src = {imgBaseURL + data.backdrop_path}></img>
                        </div>
                        <h1 className = "title">{data.title}</h1>
                    </div>
                ))}
            </div>)

            : null }
        </>
    )
}

export default ItemGrid