/**
 * Generates the generic url to be built on for the TMDB API
 * @constant
 */
const base_url = () => {
    return "https://api.themoviedb.org/3/";
}

/**
 * Nate's api key to access the TMDB API, which gets added to the request url
 * @constant
 */
const api_key = () => {
    return "api_key=89dc67a7d17fd3246c4177bd3ac310a9";
}

/**
 * Searches for movies with particular title
 * @param {string} term - Search term to find movies with that matching title
 * Returns JSON object with 'results' as array of JSON movie objects 
 */
export async function searchMovie(term){
    let base = base_url() + "search/movie?" + api_key() + "&language=en-US&query=";
    let s_term = encodeURIComponent(term.toLowerCase());
    base += s_term + "&page=1&include_adult=false";
    return await( await fetch(base)).json();
}

/**
 * Gets the movie information based on TMDB's id for that movie
 * @param {int} id - TMDB-specific id for desired movie
 * Returns JSON object with movie info
 */
export async function getMovie(id){
    let base = base_url() + 'movie/' + id + '?'+ api_key() + "&language=en-US";
    return await( await fetch(base)).json();
}

/**
 * Gets the poster for a movie
 * @param {string} url - url of the path to the poster, which is included in the movie JSON object under 'poster_path'
 * Returns string object
 */
export function getPoster(url){
    return "http://image.tmdb.org/t/p/w185/" + url;
}

/**
 * Gets movies similar to a particular movie
 * @param {int} id - TMDB-specific id for desired movie
 * Returns JSON object with movie JSON objects in the 'results' array
 */
export async function getSimilarMovies(movie_id){
    let base = base_url() + "movie/" + movie_id + "/similar?" + api_key() + "&language=en-US&page=1";
    return await( await fetch(base)).json();
}

/**
 * Recursive function that searches popular movies based on genre
 * Only searches the first 101 pages for results
 * Searches until it has found at least 5 results or reaches end of pages
 * @param {int array} genres - TMDB-specific ids of genres to search on
 * @param {int} page - page to search, start with 1
 * @param {JSON array} overall_results - results from search, start with empty array `[]`
 * Returns array of JSON movie objects
 */
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

/**
 * Recursive function that searches top-rated movies based on genre
 * Only searches the first 101 pages for results
 * Searches until it has found at least 5 results or reaches end of pages
 * @param {int array} genres - TMDB-specific ids of genres to search on
 * @param {int} page - page to search, start with 1
 * @param {JSON array} overall_results - results from search, start with empty array `[]`
 * Returns array of JSON movie objects
 */
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