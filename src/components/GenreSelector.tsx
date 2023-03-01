import React, { useEffect } from 'react'
import { useState } from 'react';
import "./css/genre_selector.css"

const GenreSelector = () => {
    const dropStyle = (element: CSSStyleDeclaration) => {
        element.backgroundColor = "white";
        element.fontWeight = "normal";
    }

    const enableStyle = (element: CSSStyleDeclaration) => {
        element.backgroundColor = "rgba(0, 191, 255, 0.243)";
        element.fontWeight = "bold";
    }

    const [selected, setSelected] = useState("tv_initial");

    useEffect(() => {
        var movieButtonStyle = document.getElementById("moviesButton")!.style;
        var tvShowsButtonStyle = document.getElementById("tvShowButton")!.style;

        if(selected === "tv") {
            // drop movies style
            dropStyle(movieButtonStyle);
            enableStyle(tvShowsButtonStyle);
        }
        else if(selected === "movies") {
            dropStyle(tvShowsButtonStyle);
            enableStyle(movieButtonStyle);
        }
        else if(selected === "tv_initial") return;
        else throw Error("hmm");
    });

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