import React from "react";
import './menuBar.css'
import { RxAvatar } from 'react-icons/rx';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { SetIsWatchList } from '../../services/localStorage/localStorage'

export function MenuBar({handleSearch}) {
    const handleSubmit = (e) =>{
        e.preventDefault()
        handleSearch(e.target[0].value)
    }
    return (
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="menuBar-container">
            <form onSubmit={handleSubmit}>
                <input type="search" name="" id="" placeholder='Search 🔍' title='Empyt get random shows'/>
                <Link to='my+watch+list'
                    onClick={() => SetIsWatchList(true)}
                >
                    <RxAvatar className="icon" title='My Watch List'/>
                </Link>
            </form>
        </motion.div>
        </>
    );
}