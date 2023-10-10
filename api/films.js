import { randomTitle, randomDesc, randomMovie } from 'random-movies'

export  function getRandomFilms(n = 10){
    try{ return  randomTitle(n) } // return arr of titles
    catch(err){ return 'batman' };
}

export async function SearchFilmsByName(query, all = false){
    if(query){
        query = query.split(' ').join('+');
        const res = await fetch('https://www.omdbapi.com/?s=' + query + '&apikey=697aa1a8');
        const data = await res.json();
        if(data.Response == "True"){
            if(all){
                return  data.Search;   
            }else{
                return data.Search[0];
            }
        }
        return false;  
    }
}

export async function getFilmByID(query, all = false){
    const res = await fetch('https://www.omdbapi.com/?i=' + query + '&apikey=697aa1a8');
    const data = await res.json();
    if(data.Response == "True"){
        return data
    }
    return false;  
}

export async function getFullInfo(name = 'Batman+Begins', id = false){
    if(id===false){
        try{
            const res = await fetch('https://www.omdbapi.com/?t=' + name + '&apikey=697aa1a8');
            const data = await res.json();
            return  data;
        }
        catch(err){ return false}
    }else if(id===true){
        try{
            const res = await fetch('https://www.omdbapi.com/?i=' + name + '&apikey=697aa1a8');
            const data = await res.json();
            return  data;
        }
        catch(err){ return  false}
    }
    
}

const local =  window.localStorage;

export const handleAddToWatchList = (event) => {
    event.target.blur()
    const imdbID = event.target.name;
    let list = JSON.parse(local.getItem('watch-list'));
    if(!list){
        list = []
    }
    getFilmByID(imdbID).then(data => {
        if(data){
            setTimeout(() => {            
                list.push({
                    "Title": data.Title,
                    "Year": data.Year,
                    "imdbID": data.imdbID,
                    "Type": data.Type,
                    "Poster": data.Poster
                });
                local.setItem('watch-list', JSON.stringify(list));
            }, 1000);
        }
    })
};

export const handleRemoveToWatchList = (event) => {
    event.target.blur();
    const imdbID = event.target.name;
    const list = JSON.parse(local.getItem('watch-list'));
    const newList = list.filter(element => element.imdbID != imdbID)
    local.setItem('watch-list', JSON.stringify(newList));
}

export const handleRemoveAll = (event) =>{
    event.target.blur()
    local.removeItem('watch-list')
}