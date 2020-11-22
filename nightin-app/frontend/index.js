import {getMovie,getPoster} from "./js/tmdb.js";


$(function () {
    let username = window.sessionStorage.getItem('name');
    if (username != null){
        loadUser(username);
    }
});

async function loadUser(user) {
    const $divLoggedIn = $('#loggedinuser');
    $divLoggedIn.append("Welcome " + user + "!");
    const $divMov = $('#usermoviestit');
    $divMov.append("Revisit your favorite movies:");
    const $divRep = $('#userrecipestit');
    $divRep.append("Revisit your favorite recipes:");
    generateUserMovies();
    //setTimeout(changeFocus, 1000);
}

function changeFocus(){
    window.location.href = "index.html#userspecific";
}

async function generateUserMovies(){

    let loginn = window.sessionStorage.getItem('login');
    let data_string = JSON.stringify({
        login: loginn
    });

    let response = await $.ajax(appconfig.baseurl + "/getmovies", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    });
    response = JSON.parse(response);
    //console.log(response);
    let usermovies = [];
    for (let i = 0; i<response.length; i++){
        //console.log(response[i].movieid);
        usermovies.push(await getMovie(response[i].movieid));
    }
    genMovies(usermovies);
    
}

function genMovies(movies){
    let imp = document.createElement('div');
    imp.className = "list-group";
    imp.id = "usermovies";
    
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
        div1.append(div2);
        div1.append(img);
        ap.append(div1);
        imp.append(ap);
    }
    document.getElementById("usermovies").replaceWith(imp);
    changeFocus();
}