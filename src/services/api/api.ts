import axios from 'axios';
import { randomTitle } from 'random-movies'
import {FilmInfo, Search, SearchFilm} from '../../types/types'

export const api = axios.create({
    baseURL: 'https://www.omdbapi.com'
})

export  function GetRandomFilmsTitle(n = 30 ) {
    try{ return  randomTitle(n)  } 
    catch(err){ return ['batman'] };
}

export const GetRandomFilms = async () => {
    const NAMES  = GetRandomFilmsTitle()
    let res:Array<SearchFilm> = []
    for(let name of NAMES){
        let aux = await SearchMovieByName(name)
        if(aux){
            res = [...res, aux[0]]
        }
    }
    return ( res )
}

export const SearchMovieByName = async (query = 'batman', all = false) => {
    const QUERY = query.split(' ').join('+');
    try {
        const response = await api.get('/?s=' + QUERY + '&apikey=' + process.env.REACT_APP_API_KEY);
        const data:Search = response.data;
        if(data.Response === 'True'){
            const res:Array<SearchFilm> = data?.Search
            return ( res );
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

export const SearchMovieById = async (query = 'tt1877830') => {
    const QUERY = query
    try {
        const response = await api.get('/?i=' + QUERY + '&apikey=' + process.env.REACT_APP_API_KEY);
        if(response.data?.Response === 'True'){
            const data:FilmInfo = response.data;
            return data
        }
        return false
    } catch (error) {
        return false
    }
}