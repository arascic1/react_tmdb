import React, { useEffect, useRef } from 'react'
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
                {(() => {
                    const elements = []
                    let minorUIFix = false

                    for(let i = 0; i < content.data.length; i++) {
                        const data = content.data[i]

                        if(i % 2 == 0 && i != content.data.length - 1) {
                            if(data.title.length > 35 || content.data[i + 1].title.length > 35) minorUIFix = true
                            else minorUIFix = false
                        }

                        elements.push(
                            <div className = "gridItem" key = {data.id}>
                                <div className='divSlike'>
                                    <img className = "itemImage" alt = {data.title} src = {imgBaseURL + data.backdrop_path}></img>
                                </div>
                                <h1 className = {minorUIFix ? "title center" : "title"}>{data.title}</h1>
                            </div>
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