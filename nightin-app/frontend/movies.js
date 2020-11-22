
import {searchMovie,getPoster, getSimilarMovies, getPopularMovies, getRatedMovies} from "./js/tmdb.js";

//TO-DO: make a generic movie item generating funnction?

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

let butCol = 0;

$(function() {
    //$('a').on("click", genRequest);
    $('form').on("click", genRequest);
    $('#reset').on("click", resetRequest);
    //$('#submit').on("click", submitRequest);
    $('#similar').on("click", getSim);
    // $('input').keypress(function(ev){
    //     if (ev.keyCode === 13){
    //         addBut(ev);
    //     }
    // });
    $('#rated').on("click", getRated);
    $('#popular').on("click", getPopular);
    //$('.fav').on("click", storeMovieInfo);
});

async function storeMovieInfo(evt){
    let idd;
    console.log(evt.target);
        
    //console.log(evt.target.parentElement.className);
    
    if (evt.target.className.includes("fa-heart")){
        idd = evt.target.parentElement.parentElement.id;
        evt.target.parentElement.className += " active";
    } else {
        idd = evt.target.parentElement.id;
        evt.target.className += " active";
    }
    console.log(idd);
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

    // the title isn't showing up!
    if (results === []){
        let chan = document.getElementById("response-tit").textContent;
        chan.textContent = "Sorry! No movies in the first 100 pages had that genre combination :(";
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
    console.log(results);
    if (results === []){
        document.getElementById("response-tit").textContent = "Sorry! No movies in the first 100 pages had that genre combination :(";
    } else {
        genMovies(results);
    }
}

// Handling front-end request bar
function resetRequest(ev){
    //ev.target.className += " active";
    butCol = 0;
    $('#buttons').replaceWith(buttons());
    $('#movieresponse').replaceWith(emptyRes());
    $("#similar").replaceWith(`<button type="button" class="btn btn-outline-danger" id="similar">Get similar movies</button>`);
    $("#request").text = '';
    $("#request").replaceWith(`<input type="text" class="form-control" id="request" placeholder="Enter your favorite movie">`);
};

function genRequest(ev, alt){
    ev.target.className += " active";
}

//aesthetic documentation: https://getbootstrap.com/docs/4.0/components/list-group/ 

async function getSim(even){
    document.getElementById("response-tit").textContent = "Here are some movies you might like:";
    even.target.className += " active";
    let movie = document.getElementById("request").value.trim();
    let result = await searchMovie(movie);
    let sim_result = await getSimilarMovies(result.results[0].id);
    genMovies(sim_result.results);
    
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
        //ap.href = sim_results[i].href; //TO DO generate movie url

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