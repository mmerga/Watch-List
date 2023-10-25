import React, { useState } from "react";
import { SearchFilm } from '../../types/types'
import './filmSearch.css'
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { GetIsWatchList, RemoveFromWatchList } from '../../services/localStorage/localStorage'

const FilmSearchTile = (props) => {

    const handleRemove:Function = props?.handleRemove
    const handleRem = (imdbID) =>{
        RemoveFromWatchList(imdbID)
        handleRemove()
    }
    const film:SearchFilm = props.film
    return(
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="FilmSearch-tile"
            title={film.Title}
        >
            <Link  to={`/${film.imdbID}`} relative="path">
                <img src={film.Poster} 
                    alt={film.Title} 
                    />
                <p className="year" id={film.imdbID}>
                    {film.Year}
                </p>
            </Link>
            {
                GetIsWatchList() ? 
                <button onClick={() => handleRem(film.imdbID)}>Remove from WatchList</button>
                : null
            }
        </motion.div>
        </>
    )
}

export const FilmSearch = (props) => {
    const films:Array<SearchFilm> = props.films
    const handleRemove:Function = props?.handleRemove
    const handleRemoveAll:Function = props?.handleRemoveAll
    return(
        <>
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="FilmSearch-container"
        >   
            {GetIsWatchList() ?
                <div className="button-container">
                    <button type="button" className="remove-all" onClick={() => handleRemoveAll()}>Remove All</button>
                </div>
            : null
            }
            {films[0]?.Title ? films?.map(film => <FilmSearchTile id={film.Title} name={film.Title} film={film} handleRemove={handleRemove} key={film.imdbID}/>) : null}
        </motion.div>
        </>
    )
}