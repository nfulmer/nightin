const api_key = () => {
    return "api_key=89dc67a7d17fd3246c4177bd3ac310a9";
}

const base_url = () => {
    return "https://api.themoviedb.org/3/";
}

export async function searchMovie(term){
    let base = base_url() + "search/movie?" + api_key() + "&language=en-US&query=";
    let s_term = encodeURIComponent(term.toLowerCase());
    base += s_term + "&page=1&include_adult=false";
    return await( await fetch(base)).json();
}

export async function getMovie(id){
    let base = base_url() + 'movie/' + id + '?'+ api_key() + "&language=en-US";
    return await( await fetch(base)).json();
}

export function getPoster(url){
    return "http://image.tmdb.org/t/p/w185/" + url;
}

export async function getSimilarMovies(movie_id){
    let base = base_url() + "movie/" + movie_id + "/similar?" + api_key() + "&language=en-US&page=1";
    return await( await fetch(base)).json();
}

export async function getPopularMovies(genres, page, overall_results){
    let base = base_url() + "movie/popular?" + api_key() + "&language=en-US&";
    //console.log(page);
    if (page == 1){
        base += "page=1";
    } else if (page > 100) {
        return overall_results;
    } else {
        base += "page=" + page;
    }
    let search_results = (await( await fetch(base)).json()).results;
    if (genres === []){
        return search_results;
    }
    for (let i = 0; i < search_results.length; i++){
        let ids = search_results[i].genre_ids;
        let meets_criteria = true;
        for (let j = 0; j < genres.length; j++){
            if (!ids.includes(parseInt(genres[j]))){
                meets_criteria = false;
                break;
            }
        }
        if (meets_criteria){
            overall_results.push(search_results[i]);
        }
    }
    if (overall_results.length < 5){
        return getPopularMovies(genres, page + 1, overall_results);
    } else {
        return overall_results;
    }
}

export async function getRatedMovies(genres, page, overall_results){
    let base = base_url() + "movie/top_rated?" + api_key() + "&language=en-US&";
    //console.log(page);
    if (page == 1){
        base += "page=1";
    } else if (page > 100) {
      return overall_results;
    } else {
        base += "page=" + page;
    }
    let search_results = (await( await fetch(base)).json()).results;
    if (genres === []){
        return search_results;
    }
    for (let i = 0; i < search_results.length; i++){
        let ids = search_results[i].genre_ids;
        let meets_criteria = true;
        for (let j = 0; j < genres.length; j++){
            if (!ids.includes(parseInt(genres[j]))){
                meets_criteria = false;
                break;
            }
        }
        if (meets_criteria){
            overall_results.push(search_results[i]);
        }
    }
    if (overall_results.length < 5){
        return getRatedMovies(genres, page + 1, overall_results);
    } else {
        return overall_results;
    }
}