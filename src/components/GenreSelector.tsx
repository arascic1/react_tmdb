import React, { Dispatch, useEffect } from 'react'
import { useState } from 'react';
import { useAppDispatch } from '../state/hooks';
import { fetchTopMovies, fetchTopTVShows } from '../state/slices/contentSlice';
import "./css/genre_selector.css"

type GenreSelectorProps = {
    setRegime: Dispatch<React.SetStateAction<string>>
}

const GenreSelector = (props: GenreSelectorProps) => {
    const dropStyle = (element: CSSStyleDeclaration) => {
        element.backgroundColor = "white";
        element.fontWeight = "normal";
    }

    const enableStyle = (element: CSSStyleDeclaration) => {
        element.backgroundColor = "rgba(0, 191, 255, 0.243)";
        element.fontWeight = "bold";
    }

    const dispatch = useAppDispatch()

    const [selected, setSelected] = useState("tv_initial");

    useEffect(() => {
        var movieButtonStyle = document.getElementById("moviesButton")!.style;
        var tvShowsButtonStyle = document.getElementById("tvShowButton")!.style;

        if(selected === "tv") {
            // drop movies style
            dropStyle(movieButtonStyle);
            enableStyle(tvShowsButtonStyle);

            props.setRegime(selected)
            // dispatch(fetchTopTVShows())
        }
        else if(selected === "movies") {
            dropStyle(tvShowsButtonStyle);
            enableStyle(movieButtonStyle);

            props.setRegime(selected)
            // dispatch(fetchTopMovies())
        }
        else if(selected === "tv_initial") {
            dispatch(fetchTopTVShows())
        }
        else throw Error("hmm");
    }, [selected]);

    return (
        <div className="container" id = "container">
            <button type = "button" 
                className = "selectorButton" 
                id = "moviesButton"
                onClick = { () => { setSelected("movies") } }
            >Movies</button>
            
            <button type = "button" 
                className = "selectorButton" 
                id = "tvShowButton"
                onClick = { () => { setSelected("tv") } }
            >TV Shows</button>
        </div>
    );
}

export default GenreSelector