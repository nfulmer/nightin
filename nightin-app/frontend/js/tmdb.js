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

export function getPoster(url){
    return "http://image.tmdb.org/t/p/w185/" + url;
}

export async function getSimilarMovies(movie_id){
    let base = base_url() + "movie/" + movie_id + "/similar?" + api_key() + "&language=en-US&page=1";
    return await( await fetch(base)).json();
}