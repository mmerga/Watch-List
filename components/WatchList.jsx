import React from 'react'
import { handleRemoveAll } from '../api/films'

export default function WatchList({watchList, isFilmInfo}){
    return (
      <div className='watch-list'>
        <h1>My Watch List</h1>
        {
          isFilmInfo ? 
            <div className='watch-full-info'>{watchList}</div>
          : 
            <>
              <button  className='btn btn-remove-all' onClick={handleRemoveAll} >Remove All</button>
              {watchList}
            </>
        }
      </div>
    )
  }