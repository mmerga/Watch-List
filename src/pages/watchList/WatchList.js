import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { GetWatchList, SetIsWatchList, DeleteWatchList } from '../../services/localStorage/localStorage'
import { FilmSearch } from '../../components/filmSearch/filmSearch.tsx'
import { FcSearch } from 'react-icons/fc';
import './watchList.css'



export const WatchList = () => {
    const [movies, setMovies] = useState()
    const [isMovie, setIsMovie] = useState(false)
    const [removed, setRemoved] = useState(false)

    const get = useCallback(async () => {
        let response = await GetWatchList()
        setMovies(response)
        setIsMovie(true)
    }, [])

    useEffect(()=> {
        get()
    }, [removed])

    const handleRemove = () => {
        setRemoved(prevState => !prevState)
    }
    
    const handleRemoveAll = () =>{
        DeleteWatchList()
        setRemoved(prevState => !prevState)
    }

    return (
        <>  
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Link className="link" to='/' onClick={() => SetIsWatchList(false)}>
                    <p>
                        ↩<FcSearch className="logo"/>
                    </p>
                </Link>
                {isMovie ? <FilmSearch films={movies} isWatchList={true} handleRemove={handleRemove} handleRemoveAll={handleRemoveAll}/> : null}
            </motion.div>
        </>
    )
}