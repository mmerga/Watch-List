import React from 'react'
import { handleAddToWatchList, handleRemoveToWatchList } from '../api/films.js'

function renderSlot({Title, Year, imdbID, Poster}, isWatchList = false){
    return(
        <div id='film-search-wrapper-element'>
            <div className='film-search'  >
                <div className='film-search-info' >
                    <span >{Title}</span>
                    <span> {Year}</span>
                </div>
                <div className='film-search-img' id={imdbID}>
                    <img className='film-search-img-img' src={Poster} alt={`Poster of ${Title} film`} id={imdbID}></img>
                </div>
            </div>
            <div className='film-search-btn-wrapper'>
            {
                isWatchList ? 
                    <button  className='btn btn-danger' onClick={handleRemoveToWatchList} name={imdbID}>Remove from Watch List</button>

                :
                    <button  className='btn btn-add' onClick={handleAddToWatchList} name={imdbID}>Add to Watch List</button>
            }
            </div>
        </div>
    );
}

export default function FilmSearchRender(obj, isWatchList = false) {
    const slot = obj.map(element => {
        element.key = element.imdbID 
        return renderSlot(element, isWatchList)
    });
    return (
        <div className='film-search-wrapper'>
            {slot}
        </div>
        );
}
