import React from 'react'

export default function SearchFilm({handleSearch, search, isFilmInfo}){
    return (
      <div className='search-list'>
        {
          isFilmInfo ? 
          <div className='watch-full-info'>{search}</div>
          :
          <>
            <form>
              <input type='text' id='search-input' placeholder='Iron Man'></input>
              <button className='btn' onClick={handleSearch}>Search</button>
            </form>
            {search}
          </>
        }
      </div>
    )
  }