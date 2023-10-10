import React from 'react';
import ReactDOM from 'react-dom/client';

import { getFullInfo, handleRemoveAll} from './api/films.js';
import FilmInfoRender from './components/FilmInfoRender.jsx';
import { scrollTop, randomFilmsRender, searchFilmsRender, hasClass, getWatchList } from './func/func.js'
import Loader from './components/Loader.jsx'
import Loaded from './components/Loaded.jsx'

function App (){
  const [search, setSearch] = React.useState();
  const [prevDisplaySearch, setPrevDisplaySearch] = React.useState();
  
  const [watchList, setWatchList] = React.useState(getWatchList());
  const [prevDisplayWatchList, setPrevDisplayWatchList] = React.useState(getWatchList());
  const [isWatchList, setIsWatchList] = React.useState(false);
  
  const [isFilmInfo, setIsFilmInfo] = React.useState(false);
  
  const [load, setLoad] = React.useState(true);

  React.useEffect(()=>{
    const data = randomFilmsRender(6);
    setTimeout(() => {
      setSearch(data);
      setPrevDisplaySearch(data);
      setLoad(false);
    }, 1000); 
  },[])

  React.useEffect(() => {
    const changeState = () => {
      if(isFilmInfo===false){
        async function getInfo(){
          const info = await getFullInfo(event.target.id, true);
          return info
        }
        getInfo().then(data =>  {
          if(isWatchList){
            setWatchList(FilmInfoRender(data, true))
          }else{
            setSearch(FilmInfoRender(data))
          }
        })
        setIsFilmInfo(true)
      }else{
        if(isWatchList){
          setWatchList(prevDisplayWatchList)
        }else{
          setSearch(prevDisplaySearch)
        }
        setIsFilmInfo(false)
      }
      scrollTop();
    }

    const handleClick = event => {
      const element = document.getElementById(event.target.id)
      if(hasClass(element, 'film-search-img') || hasClass(element, 'film-info-img')){
        changeState();
      }
    };

    document.getElementById('go-back-film-info')?.addEventListener('click', changeState);
    document.addEventListener('click', handleClick);
    return () => {
      document.getElementById('go-back-film-info')?.removeEventListener('click', changeState);
      document.removeEventListener('click', handleClick);
    };
  }, [isFilmInfo, isWatchList]);

  const handleSearch = (event) => {
    setLoad(true);
    event.preventDefault();
    const value = document.getElementById('search-input').value
    document.getElementById('search-input').value = ''
    const data = searchFilmsRender(value)
    setTimeout(() => {
      setSearch(data);
      setPrevDisplaySearch(data);
      setWatchList(getWatchList())
      setIsWatchList(false);
      setIsFilmInfo(false);
      setLoad(false);
    }, 1000); 
  }

  const handleWatchList = (event) => {
    if(!isFilmInfo){
      setPrevDisplayWatchList(getWatchList());
      setIsWatchList(true);
      scrollTop();
      document.getElementById('first-btn').blur()
    }
  }
  
  const handleSearchGoBack = (event) => {
    if(!isFilmInfo){
      setPrevDisplayWatchList(getWatchList());
      setIsWatchList(false)
      scrollTop();
      document.getElementById('first-btn').blur()
    }
  }

  return (
    <>
      {/* <h1>Hello World</h1> */}
      { load ?  
        <Loader />
      :
        <Loaded 
          isFilmInfo={isFilmInfo}
          isWatchList={isWatchList}
          handleSearchGoBack={handleSearchGoBack}
          handleWatchList={handleWatchList}
          watchList={watchList}
          handleSearch={handleSearch}
          search={search}
        />
      }
    </>
  );
}

/* Only run when page is full loaded */
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
});