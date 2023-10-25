const local =  window.localStorage;

export function GetPrevSearch(){
    const prevSearch = JSON.parse(local.getItem('prev-search'))
    if (prevSearch){
        return  prevSearch
    }else{
        return false
    }
}

export function SetPrevSearch(item){
	local.removeItem('prev-search')
	local.setItem('prev-search', JSON.stringify(item));
}

export function SetWatchList(item){
    let watchList = GetWatchList()
    if(watchList){
        let newWatchList = [...watchList, item]
        local.setItem('watch-list', JSON.stringify(newWatchList));
    }else{
        let newWatchList = [item]
        local.setItem('watch-list', JSON.stringify(newWatchList));
    }
}

export function GetWatchList(){
    const watchList = JSON.parse(local.getItem('watch-list'))
    if (watchList){
        return  watchList
    }else{
        return false
    }
}

export function RemoveFromWatchList(imdbID){
    let watchList = GetWatchList()
    let newWatchList = watchList.filter(element => {
        return element.imdbID !== imdbID
    })
    local.setItem('watch-list', JSON.stringify(newWatchList));
}

export function DeleteWatchList(){
    local.removeItem('watch-list')
}

export function GetIsWatchList(){
    const isWatchList = JSON.parse(local.getItem('is-watch-list'))
    return isWatchList
}

export function SetIsWatchList(value){
    local.removeItem('is-watch-list')
    local.setItem('is-watch-list', JSON.stringify(value))
}