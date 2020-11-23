
import {searchMovie,getPoster, getSimilarMovies, getPopularMovies, getRatedMovies} from "./js/tmdb.js";


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

const emptyRes = () => {
    return `<section id="movieresponse">
    <br><br> <br>
    <h3 class="text-muted" id="response-tit"></h3>
    <br>
    <div class="list-group" id="response">

    </div>

</section>`;
}

const movies = () => {
    return ["Star Trek", "Star Wars", "Skyfall", "Mission Impossible","The Godfather", "The Avengers", "Mean Girls", "Cruel Intentions", "Clueless", "Die Hard", "Titanic", "The Dark Knight", "Transformers", "Goodfellas", "Love Actually", "Inception", "The Shawshank Redemption", "Fast and Furious", "Juno", "Superbad", "Jumanji", "Borat", "High School Musical"]; 
}


$(function() {

    $('form').on("click", genRequest);
    $('#reset').on("click", resetRequest);
    $('#similar').on("click", getSim);
    $('#rated').on("click", getRated);
    $('#popular').on("click", getPopular);
    $('#movie_complete').on('input', debounce(handleInput, 400));
});

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

function emptyList(){
    let a = document.createElement("div");
    a.id = "autocomplete-list";
    a.className = "autocomplete-items";
    document.getElementById('autocomplete-list').replaceWith(a);
}

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
        genMovies(results);
    }
}

// Handling front-end request bar
function resetRequest(ev){
    $('#buttons').replaceWith(buttons());
    $('#movieresponse').replaceWith(emptyRes());
    $("#similar").replaceWith(`<button type="button" class="btn btn-outline-danger" id="similar">Get similar movies</button>`);
    $("#movie_complete").textContent = '';
    $("#request").replaceWith(`<input type="text" class="form-control" id="request" placeholder="Enter your favorite movie">`);
    $('#similar').on("click", getSim);
};

function genRequest(ev, alt){
    ev.target.className += " active";
}

//aesthetic documentation: https://getbootstrap.com/docs/4.0/components/list-group/ 

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
            genMovies(sim_result.results);
        }
    
}
}

 function genFavBut(){
    let but = document.createElement("button");
    but.className = "btn btn-outline-danger fav";
    but.addEventListener("click", storeMovieInfo);
    let ii = document.createElement("i");
    ii.className = "fa fa-heart";
    but.append(ii);
    return but;
 }

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
    //window.location.href = "movies.html#movieresponse";
}