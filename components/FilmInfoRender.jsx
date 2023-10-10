import React from 'react'
import { AiFillStar } from 'react-icons/ai'; 
import { handleAddToWatchList, handleRemoveToWatchList } from '../api/films.js'

export default function FilmInfoRender(obj, isWatchList  = false){

    return (
        <div className='film-info' >
            <div className='film-info-img' id={obj.imdbID}>
                <img src={obj.Poster} alt='film poster' id={obj.imdbID}></img>
            </div>
            <div className='button-wrapper'>
                {
                    isWatchList ? 
                    <button id={obj.imdbID} className='btn btn-danger' onClick={handleRemoveToWatchList}>Remove from Watch List</button>
                    :
                    <button name={obj.imdbID} className='btn btn-add' onClick={handleAddToWatchList}>Add to Watch List</button>
                }
            </div>
            <div className='film-info-info' >
                <p>{obj.Title}<span className='block'>{obj.Year}</span></p>
                <p>{obj.Genre}</p>
                <p>{obj.Runtime}<span id='imdb'><AiFillStar />{obj.imdbRating}</span><span>Votes: {obj.imdbVotes}</span></p>
                <p>{obj.Plot}</p>
                <p><span className='bold'>Actors: </span>{obj.Actors}</p>
                <p><span className='bold'>Director: </span>{obj.Director}</p>
                <p><span className='bold'>Writer: </span>{obj.Writer}</p>
                <p><span className='bold'>Box Office: </span>{obj.BoxOffice}</p>
                <p><span className='bold'>Awards: </span>{obj.Awards}</p>
                <p><span className='bold'>Country: </span>{obj.Country}</p>
                <p><span className='bold'>DVD: </span>{obj.DVD}</p>
                <p><span className='bold'>Language: </span>{obj.Language}</p>
                <p><span className='bold'>Production: </span>{obj.Production}</p>
            </div>
        </div>
    );
}

