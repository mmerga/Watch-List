import React from 'react'
import {getRandomFilms, SearchFilmsByName } from '../api/films.js';
import FilmSearchRender from '../components/FilmSearchRender.jsx';

const local =  window.localStorage;

export const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function filmRender(element, arr, all = false, isWatchList = false){
    SearchFilmsByName(element, all).then(data => {
        if(all){
            data.forEach(e => {

                arr.push(FilmSearchRender([e], isWatchList))
            })
        }
        else{
            arr.push(FilmSearchRender([data], isWatchList))
        }
    })
}

export function randomFilmsRender(n = 2){
    let fil = [...getRandomFilms(n)];  
    const newFil = []
    fil.forEach((element) => {
        filmRender(element, newFil, false)
    })
    return  newFil
}

export function searchFilmsRender(name = false){
    let newFil = []
    if(name){
        filmRender(name, newFil, true)
        return newFil
    }else{
        return randomFilmsRender(5)
    }
}

export function hasClass(element, className) {
    try{
        return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
    }catch(err){/* console.log(err.message) */}
}

export function getWatchList(){
    const fil = JSON.parse(local.getItem('watch-list'))
    if (fil){
        const newFil = []
        fil.forEach((element) => {
            filmRender(element.Title, newFil, false, true)
        })
        return  newFil
    }else{
        return false
    }
}