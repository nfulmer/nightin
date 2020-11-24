import {searchMovie,getPoster, getSimilarMovies, getPopularMovies, getRatedMovies} from "./js/tmdb.js";

/**
 * Generates the non-selected genre buttons for reset
 * id's are the tmdb-specific ids for each genre
 * @constant
 */
const buttons = () => {
    return ` <div id="buttons">
    <button type="button" class="btn btn-outline-primary" id="28">Action</button>
    <button type="button" class="btn btn-outline-secondary" id="12">Adventure</button>
    <button type="button" class="btn btn-outline-success" id="16">Animation</button>
    <button type="button" class="btn btn-outline-warning" id="35">Comedy</button>
    <button type="button" class="btn btn-outline-info" id="80">Crime</button>
    <button type="button" class="btn btn-outline-danger" id="99">Documentary</button>
    <button type="button" class="btn btn-outline-primary" id="18">Drama</button>
    <button type="button" class="btn btn-outline-secondary" id="10751">Family</button>
    <button type="button" class="btn btn-outline-success" id="14">Fantasy</button>
    <button type="button" class="btn btn-outline-warning" id="36">History</button>
    <button type="button" class="btn btn-outline-info" id="27">Horror</button>
    <button type="button" class="btn btn-outline-danger" id="10402">Music</button>
    <button type="button" class="btn btn-outline-primary" id="9648">Mystery</button>
    <button type="button" class="btn btn-outline-secondary" id="10749">Romance</button>
    <button type="button" class="btn btn-outline-success" id="878">Science Fiction</button>
    <button type="button" class="btn btn-outline-warning" id ="53">Thriller</button>
    <button type="button" class="btn btn-outline-info" id="10752">War</button>
    <button type="button" class="btn btn-outline-danger" id="37">Western</button>
</div>`;
}

/**
 * Generates the empty movie response section for reset
 * @constant
 */
const emptyRes = () => {
    return `<section id="movieresponse">
    <br><br> <br>
    <h3 class="text-muted" id="response-tit"></h3>
    <br>
    <div class="list-group" id="response">
    </div>
</section>`;
}

/**
 * The movies used for autocomplete
 * @constant
 */
const movies = () => {
    return ["Aladdin", "Edward Scissorhands", "Jurassic Park", "Beetlejuice", "Lord of the Rings", "Spirited Away", "Pulp Fiction", "The Shining", "Rocky", "Fight Club", "Goldfinger", "Harry Potter", "Psycho", "Indiana Jones", "Alien", "Princess Bride", "Jaws", "Star Trek", "Star Wars", "Skyfall", "Mission Impossible","The Godfather", "The Avengers", "Mean Girls", "Cruel Intentions", "Clueless", "Die Hard", "Titanic", "The Dark Knight", "Transformers", "Goodfellas", "Love Actually", "Inception", "The Shawshank Redemption", "Fast and Furious", "Juno", "Superbad", "Jumanji", "Borat", "High School Musical"]; 
}


$(function() {
    $('form').on("click", genRequest);
    $('#reset').on("click", resetRequest);
    $('#similar').on("click", getSim);
    $('#rated').on("click", getRated);
    $('#popular').on("click", getPopular);
    $('#movie_complete').on('input', debounce(handleInput, 400));
});


function resetRequest(ev){
    $('#buttons').replaceWith(buttons());
    $('#movieresponse').replaceWith(emptyRes());
    $("#similar").replaceWith(`<button type="button" class="btn btn-outline-danger" id="similar">Get similar movies</button>`);
    $("#movie_complete").replaceWith(`<input type="text" class="form-control" id="movie_complete" placeholder="Enter your favorite movie here">`);
    $("#request").replaceWith(`<input type="text" class="form-control" id="request" placeholder="Enter your favorite movie">`);
    $('#similar').on("click", getSim);
    $("#movie_complete").on('input', debounce(handleInput, 400));
};

// changes genre buttons to active when selected
function genRequest(ev){
    ev.target.className += " active";
}

/**
 * The next three functions deal with the autocomplete on the movies
 * 
 * Function 1: the debounce function that takes in the fuction to execute and wait time
 */
function debounce(func, wait){
    let timeout;
    return function(...args){
        const context = this;
        const executor = function(){
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(executor, wait);
    }
}

/**
 * Function 2: filters the movie array based on entered letters and updates the drop down list
 */
function handleInput(even){
    const inputData = even.target.value;
    let compl_res = movies().filter(foo => foo.slice(0,inputData.length) === inputData);
    let a = document.createElement("div");
    a.id = "autocomplete-list";
    a.className = "autocomplete-items";
    document.getElementById('autocomplete-list').replaceWith(a);
    let b;
    for (let i = 0; i<compl_res.length; i++){
        b = document.createElement("div");
        b.innerText = compl_res[i];
        b.addEventListener('click', function(e){
            document.getElementById("movie_complete").value = e.target.innerText;
            emptyList();
        });
        a.append(b);
    }
}

/**
 * Function 3: closes the drop down list when an object is selected
 */
function emptyList(){
    let a = document.createElement("div");
    a.id = "autocomplete-list";
    a.className = "autocomplete-items";
    document.getElementById('autocomplete-list').replaceWith(a);
}


/**
 * The next three functions deal with the various searching options
 * 
 * Function 1: searches popular movies based on selected genre buttons
 */
async function getPopular(ev){
    let chosen_genres = document.getElementsByClassName("active");
    let genres = [];
    for (let i = 0; i<chosen_genres.length; i++){
        genres.push(chosen_genres[i].id);
    }
    let results = await getPopularMovies(genres, 1, []);

    if (results === undefined || results.length === 0){
        document.getElementById("response-tit").textContent = "Sorry! No popular movies had that genre combination :(";
    } else {
        genMovies(results);
    }
    
}

/**
 * Function 2: searches top-rated movies based on selected genre buttons
 */
async function getRated(ev){
    let chosen_genres = document.getElementsByClassName("active");
    let genres = [];
    for (let i = 0; i<chosen_genres.length; i++){
        genres.push(chosen_genres[i].id);
    }
    let results = await getRatedMovies(genres, 1, []);
    //console.log(results);
    if (results === undefined || results.length === 0){
        document.getElementById("response-tit").textContent = "Sorry! No top-rated movies had that genre combination :(";
    } else {
        document.getElementById("response-tit").textContent = "Here are some movies you might like:";
        genMovies(results);
    }
}

/**
 * Function 3: first searches for movie title based on input (to get the imdb id)
 * then uses the tmdb id to get similar movies
 */
async function getSim(even){
    even.target.className += " active";
    let movie = document.getElementById("movie_complete").value.trim();
    let result = await searchMovie(movie);
    //console.log(result);
    if (result.results === undefined || result.results.length === 0){
        document.getElementById("response-tit").textContent = "Sorry! No movies found :(";
    } else {
        document.getElementById("response-tit").textContent = "Here are movies similar to " + result.results[0].original_title.trim() + ":";
        let sim_result = await getSimilarMovies(result.results[0].id);

        if (sim_result.results === undefined || sim_result.results.length === 0){
            document.getElementById("response-tit").textContent = "Sorry! No movies found :(";
        } else {
            document.getElementById("response-tit").textContent = "Here are some movies you might like:";
            genMovies(sim_result.results);
        }
    }   
}

// creates the favoriting heart button and it's associated listener function
 function genFavBut(){
    let but = document.createElement("button");
    but.className = "btn btn-outline-danger fav";
    but.addEventListener("click", storeMovieInfo);
    let ii = document.createElement("i");
    ii.className = "fa fa-heart";
    but.append(ii);
    return but;
 }

 // stores movie id and the login information in the 'movies' table at the backend when heart button clicked
 // favorited movies are accesible from the user's profile page
 async function storeMovieInfo(evt){
    let idd;

    if (evt.target.className.includes("fa-heart")){
        idd = evt.target.parentElement.parentElement.id;
        evt.target.parentElement.className += " active";
    } else {
        idd = evt.target.parentElement.id;
        evt.target.className += " active";
    }

    let loginn = window.sessionStorage.getItem('login');
    let data_string = JSON.stringify({
        login: loginn,
        id: idd
    });

    let response = await $.ajax(appconfig.baseurl + "/addmovie", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    });

    if(response[0].result === 'UPDATE_SUCCESS') {
        
     }
}

// generates the movie objects 
// the tmdb-specific id for the movie is stored in the div's id that surrounds the title and favoriting button
function genMovies(movies){
    let imp = document.createElement('div');
    imp.className = "list-group";
    imp.id = "response";
    
    for (let i = 0; i<movies.length; i++){
        let ap = document.createElement("a");
        if (i%2 === 0){
            ap.className = "list-group-item flex-column align-items-start";
        } else {
            ap.className = "list-group-item";
        }
        let div1 = document.createElement('div')
        div1.className = "d-flex w-100 justify-content-between";
        let div2 = document.createElement('div');
        div2.id = movies[i].id;
        let h = document.createElement("h3");
        h.textContent = movies[i].original_title.trim();
        h.className = "mb-1";
        let p = document.createElement('p');
        p.textContent = movies[i].overview;
        let img = document.createElement("img");
        if (movies[i].poster_path != null){
            img.src = getPoster(movies[i].poster_path);
        } else {
            img.src = "./assets/img/genposter.jpg";
        }
        img.className = "img-thumbnail rounded float-right";
        
        div2.append(h);
        div2.append(p);
        div2.append(genFavBut());
        div1.append(div2);
        div1.append(img);
        ap.append(div1);
        imp.append(ap);
    }
    document.getElementById("response").replaceWith(imp);
}