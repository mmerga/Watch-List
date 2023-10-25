import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { SearchMovieById } from '../../services/api/api.ts'
import { AiFillStar } from 'react-icons/ai';
import { motion } from "framer-motion"
import { SetWatchList, GetIsWatchList, RemoveFromWatchList, GetWatchList } from '../../services/localStorage/localStorage.js'
import { IoLogoYoutube } from 'react-icons/io'
import { Loader } from '../loader/loader.jsx'
import './filmInfoRender.css'

export const FilmInfoRender = () =>{
    const { id } = useParams()
    const [isMovie, setIsMovie] = useState(false)
    const [movie, setMovie] = useState() 
    const [isWatchList, setIsWatchList] = useState(GetIsWatchList)
    const [addRemove, setAddRemove] = useState(true)

    
    const get = useCallback(async () => {
        let res = await SearchMovieById(id)
        if(res){
            setMovie(res)
            setIsMovie(true)
        }
        return false
    }, [])
    
    useEffect(() => {
        const alwereInWatchList = async () =>{
            let res = await GetWatchList()
            let aux = false;
            res.forEach(element => {
                if(element.imdbID == id){
                    aux = true
                }
            });
            if(aux){
                setAddRemove(false)
            }else{
                setAddRemove(true)
            }
        }
        get()
        alwereInWatchList()
    }, [addRemove])

    const handleAdd = useCallback((item)=>{
        SetWatchList(item)
        setAddRemove(prevState => !prevState)
    },[])
    
    const handleRemove = useCallback((item)=>{
        RemoveFromWatchList(item.imdbID)
        setAddRemove(prevState => !prevState)
    }, [])

    return(
        <motion.div 
            initial={{ opacity: 0 , scale: 0.8}}
            animate={{ opacity: 1 , scale: 1}}
            transition={{ duration: 0.5 }}
            className="film-info-container">
            {isMovie ? 
            <>
                <motion.div 
                    initial={{ opacity: 0 , scale: 0.8}}
                    animate={{ opacity: 1 , scale: 1}}
                    transition={{ duration: 0.5 }}
                    className="film-info-tols"
                >
                    {
                        isWatchList ?
                        <>
                                <Link className="film-info-link" to='/my+watch+list' relative="path">↩ Go Back</Link>
                            </>
                        :   <>
                                <Link className="film-info-link" to='/' relative="path">↩ Go Back</Link>
                            </>
                    }
                    {
                        addRemove ? 
                            <button type="button" className="add" onClick={() => handleAdd(movie)}>Add to WatchList</button>
                        :   <button type="button" className="remove" onClick={() => handleRemove(movie)}>Remove from WatchList</button>
                    }
                </motion.div>
                <div className='film-info-img' id={movie?.imdbID}>
                    <img src={movie?.Poster} alt='film poster' id={movie?.imdbID}></img>
                </div>
                <div className='film-info-info' >
                    <div className="film-info-info-destac">
                        <p>{movie?.Title}</p>
                        <p>{movie?.Year}</p>
                        <p>{movie?.Genre}</p>
                        <p>{movie?.Runtime}<span id='imdb'><AiFillStar className="star"/>{movie?.imdbRating}</span><span>Votes: {movie?.imdbVotes}</span></p>
                        <a href={`https://www.youtube.com/results?search_query=${movie?.Title.split(' ').join('+')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <IoLogoYoutube className="youtube-logo" title='YouTube Search'/>
                        </a>
                    </div>
                    <div className="film-info-info-other">
                        <p>{movie?.Plot}</p>
                        <p><span className='bold'>Actors: </span>{movie?.Actors}</p>
                        <p><span className='bold'>Director: </span>{movie?.Director}</p>
                        <p><span className='bold'>Writer: </span>{movie?.Writer}</p>
                        <p><span className='bold'>Box Office: </span>{movie?.BoxOffice}</p>
                        <p><span className='bold'>Awards: </span>{movie?.Awards}</p>
                        <p><span className='bold'>Country: </span>{movie?.Country}</p>
                        <p><span className='bold'>DVD: </span>{movie?.DVD}</p>
                        <p><span className='bold'>Language: </span>{movie?.Language}</p>
                        <p><span className='bold'>Production: </span>{movie?.Production}</p>
                    </div>
                </div>
            </> : <Loader />}
        </motion.div>
    )
}