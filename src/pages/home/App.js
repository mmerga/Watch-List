
import './App.css';
import { useState, useEffect, useCallback} from 'react';
import { motion } from "framer-motion"
import { SearchMovieByName ,GetRandomFilms} from '../../services/api/api.ts'
import {GetPrevSearch, SetPrevSearch} from '../../services/localStorage/localStorage'

import { FilmSearch } from '../../components/filmSearch/filmSearch.tsx'
import { MenuBar } from '../../components/menuBar/menuBar.tsx'
import { Loader } from '../../components/loader/loader'

function App() {
	const [movie, setMovie] = useState(() =>{
		return GetPrevSearch()
	})
	const [isSearch, setIsSearch] = useState(false)
	const [query, setQuery] = useState('-1')

  	useEffect(()=>{
		const get = async () =>{
			let res 
			if(movie===false){
				if(query === '-1' || query === '' || query === ' '){
					setIsSearch(false)
					res = await GetRandomFilms()
				}else{
					res = await SearchMovieByName(query)
				}
				if(res){
					SetPrevSearch(res)
					setMovie(res)
					setIsSearch(true)
				}else{
					setIsSearch(false)
					alert('Nao foi possivel achar o filme');
				}
			}else{
				setIsSearch(true)
			}
		}
		get()
	}, [query])

	const handleSearch = useCallback((value) =>{
		setIsSearch(false)
		setMovie(false)
		setQuery(value)
	}, [])

	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="App">
			<MenuBar handleSearch={handleSearch} />
			{
				isSearch ? <FilmSearch films={movie}/> 
				: <Loader />
			}	
		</motion.div>
	);
}

export default App;


