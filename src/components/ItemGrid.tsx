import React, { useEffect } from 'react'
import qm from '../res/qm.jpg';
import './css/grid_item.css';

const ItemGrid = () => {
    useEffect(() => {

    });

    return (
        <div className = "itemContainer">
            <div className = "gridItem">
                <div className = "divSlike">
                    <img className = "itemImage" alt = "b" src = {qm}></img>
                </div>
                <h1 className = "title">Fight Club</h1>
            </div>

            <div className = "gridItem">
                <div className = "divSlike">
                    <img className = "itemImage" alt = "b" src = {qm}></img>
                </div>
                <h1 className = "title">Fight Club</h1>
            </div>

            <div className = "gridItem">
                <div className = "divSlike">
                    <img className = "itemImage" alt = "b" src = {qm}></img>
                </div>
                <h1 className = "title">Fight Club</h1>
            </div>

            <div className = "gridItem">
                <div className = "divSlike">
                    <img className = "itemImage" alt = "b" src = {qm}></img>
                </div>
                <h1 className = "title">Fight Club</h1>
            </div>
        </div>
    )
}

export default ItemGrid