import React from 'react'
import WatchList from './WatchList.jsx'
import SearchFilm from './SearchFilm.jsx'


export default function Loaded({isFilmInfo, isWatchList, handleSearchGoBack, handleWatchList, watchList, handleSearch, search}){
    return (
      <div className='loaded'>
      { 
        isFilmInfo ? 
          <button id='go-back-film-info' className='btn first-btn' >Go Back...</button> 
        : null
      }
      { isWatchList ? 
        <>
          { 
            isFilmInfo ? 
              null :  
              <button id='first-btn' className='btn first-btn' onClick={handleSearchGoBack}>Search....</button>
          }          
          <WatchList watchList={watchList} isFilmInfo={isFilmInfo}/> 
        </>
        : 
        <> 
          { 
            isFilmInfo ? 
            null : 
            <button id='first-btn' className='btn first-btn' onClick={handleWatchList}>My Watch List....</button>
          }          
          <SearchFilm handleSearch={handleSearch} search={search} isFilmInfo={isFilmInfo}/>
        </>
      }
      </div>
    )
  }