
import {searchMovie,getPoster, getSimilarMovies, getPopularMovies, getRatedMovies} from "./js/tmdb.js";

//TO-DO: make a generic movie item generating funnction?

const buttons = () => {
    // TO DO generate buttons
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
});

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
    if (results === []){
        document.getElementById("response-tit").textContent = "Sorry! No movies in the first 100 pages had that genre combination :(";
    } else {
        genMovies(results);
    }
}

// Handling front-end request bar
function resetRequest(ev){
    //ev.target.className += " active";
    document.getElementById("request").textContent = "";
    butCol = 0;
    //TO DO: reset buttons
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

function genMovies(movies){
    let imp = document.createElement('div');
    imp.className = "list-group";
    imp.id = "response";
    for (let i = 0; i<movies.length; i++){
        let ap = document.createElement("a");
        if (i%2 === 0){
            ap.className = "list-group-item list-group-item-action flex-column align-items-start";
        } else {
            ap.className = "list-group-item list-group-item-action ";
        }
        //ap.href = sim_results[i].href; //TO DO generate movie url

        let div1 = document.createElement('div')
        div1.className = "d-flex w-100 justify-content-between";
        let div2 = document.createElement('div');
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
        div1.append(div2);
        div1.append(img);
        ap.append(div1);
        imp.append(ap);
    }
    document.getElementById("response").replaceWith(imp);
}