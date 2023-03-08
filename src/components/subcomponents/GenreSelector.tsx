import React, { Dispatch, useEffect } from 'react'
import { useState } from 'react';
import { useAppDispatch } from '../../state/hooks';
import { fetchTopMovies, fetchTopTVShows } from '../../state/slices/contentSlice';
import "../css/genre_selector.css"

type GenreSelectorProps = {
    setRegime: Dispatch<React.SetStateAction<string>>,
    regime: string
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

    useEffect(() => {
        var movieButtonStyle = document.getElementById("moviesButton")!.style;
        var tvShowsButtonStyle = document.getElementById("tvShowButton")!.style;

        if(props.regime === "tv") {
            // drop movies style
            dropStyle(movieButtonStyle);
            enableStyle(tvShowsButtonStyle);

            props.setRegime(props.regime)
        }
        else if(props.regime === "movies") {
            dropStyle(tvShowsButtonStyle);
            enableStyle(movieButtonStyle);

            props.setRegime(props.regime)
        }
        else if(props.regime === "tv_initial") {
            dispatch(fetchTopTVShows())
        }
        else throw Error("hmm");
    }, [props.regime]);

    return (
        <div className="container" id = "container">
            <button type = "button" 
                className = "selectorButton" 
                id = "moviesButton"
                onClick = { () => { props.setRegime("movies") } }
            >Movies</button>
            
            <button type = "button" 
                className = "selectorButton" 
                id = "tvShowButton"
                onClick = { () => { props.setRegime("tv") } }
            >TV Shows</button>
        </div>
    );
}

export default GenreSelector