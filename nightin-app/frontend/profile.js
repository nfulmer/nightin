import {getMovie,getPoster} from "./js/tmdb.js";

$(function() {
    $('form').on("click",profile());
    $('form').on("click", "#btnChangePassword", handleChangePassword);
    $('form').on("click", "#btnDeleteAccount", handleDeleteAccount);
    let username = window.sessionStorage.getItem('name');
    if (username != null){
        loadUser(username);
    }
});

function profile(){
    let login = window.sessionStorage.getItem('login');
    getProfile(login);
}

export const getProfile = async function(login) {
    let data_string = JSON.stringify({
        email: login
    });

    let response = await $.ajax(appconfig.baseurl + "/getuserprofile", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })
    if(response[0].name === 'NOT_FOUND') {
         $('#pMessage').html(messages.LoginMessage2);
    }
    else { 
        $('#fname').val(response[0].firstname);
        $('#lname').val(response[0].lastname);
        $('#email').val(response[0].login);
    }
}

const handleChangePassword = function(e) {
    e.preventDefault();
    window.location.href = "password.html";
}

const handleDeleteAccount = function(e) {
    e.preventDefault();
    window.location.href = "delete.html";
}

async function loadUser(user) {
    const $divLoggedIn = $('#loggedinuser');
    $divLoggedIn.append("Welcome " + user + "!");
    
    generateUserInfo();
}


async function generateUserInfo(){

    let loginn = window.sessionStorage.getItem('login');
    //console.log(loginn);
    let data_string = JSON.stringify({
        login: loginn
    });

    let responsem = await $.ajax(appconfig.baseurl + "/getmovies", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    }).catch((error) => {
        console.error(error);
      });
    let responser = await $.ajax(appconfig.baseurl + "/getrecipes", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    }).catch((error) => {
        console.error(error);
      });
    //console.log(responser);
    //console.log(responsem);
    if(responsem[0].result === 'NO_FAVORITES'){
        const $divMov = $('#usermoviestit');
        $divMov.append("Head over to the movie page and start finding your favorites!");
        
    } else {
        responsem = JSON.parse(responsem);
        const $divMov = $('#usermoviestit');
        $divMov.append("Revisit your favorite movies:");
        let usermovies = [];
        for (let i = 0; i<responsem.length; i++){
            //console.log(response[i].movieid);
            usermovies.push(await getMovie(responsem[i].movieid).catch((error) => {console.log(error)}));
        }
        genMovies(usermovies);
    }

    if (responser[0].result === "NO_FAVORITES"){
        const $divRep = $('#userrecipestit');
        $divRep.append("Head over to the recipe page and start finding your favorites!");
    } else {
        responser = JSON.parse(responser);
        const $divRep = $('#userrecipestit');
        $divRep.append("Revisit your favorite recipes:");
        let imp = document.createElement('div');
        imp.className = "list-group";
        imp.id = "userrecipes";
        for (let i = 0; i<responser.length; i++){
            let ap = document.createElement("a");
            if (i%2 === 0){
                ap.className = "list-group-item list-group-item-action list-group-item-info";
            } else {
                ap.className = "list-group-item list-group-item-action list-group-item-danger";
            }
            ap.href = responser[i].link;
            ap.target = "_blank";
            ap.textContent = responser[i].title;
            imp.append(ap);
        }
        document.getElementById("userrecipes").replaceWith(imp);
        
    }
    let pimg = document.createElement("img");
    pimg.src = "./assets/img/bby.jpg";
    pimg.className = "rounded mx-auto d-block";
    $("#pizza_place").append(pimg);
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
}