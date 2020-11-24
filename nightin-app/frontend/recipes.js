import {makeRequest} from "./js/puppy.js";
import {searchMovie, getPoster} from "./js/tmdb.js";
 
/**
 * Generates the non-selected ingredient buttons for reset
 * @constant
 */
const buttons = () => {
    return `<div id="buttons">
    <button type="button" class="btn btn-outline-primary">Onion</button>
    <button type="button" class="btn btn-outline-secondary">Cheese</button>
    <button type="button" class="btn btn-outline-success">Apple</button>
    <button type="button" class="btn btn-outline-warning">Bread</button>
    <button type="button" class="btn btn-outline-info">Chicken</button>
    <button type="button" class="btn btn-outline-danger">Yogurt</button>
    </div>`;
}

/**
 * Generates the empty movie response section for reset
 * @constant
 */
const emptyRes = () => {
    return `<div id="response_movie"></div>`;  
}

/**
 * Generates the empty recipe response section for reset
 * @constant
 */
const emptyReq = () => {
    return `<div id="response-container">
    <h3 class="text-muted" id="response-tit"></h3>
    <div class="list-group" id="response">
    </div>
    </div>`;
}

/**
 * The ingredients used for autocomplete
 * @constant
 */
const food = () => {
    return ["Chocolate", "Milk", "Cabbage", "Kiwi", "Garlic", "Lemon", "Cashews", "Peanuts", "Pineapple", "Apple", "Celery", "Oats", "Mustard", "Tofu", "Beef", "Pork", "Cauliflower", "Broccoli", "Chickpeas", "Cumin", "Lime", "Orange", "Banana",  "Cilantro" ,"Strawberries", "Coffee", "Salmon",  "Peas", "Cucumber", "Carrots", "Lettuce", "Tomato", "Bacon", "Turkey", "Artichoke", "Blackberry", "Fig", "Potato", "Flour", "Mango", "Lentils", "Olive", "Avocado", "Corn", "Pistachio", "Apricot", "Cherry", "Almond", "Peach", "Pear", "Pomegranate", "Spinach", "Vanilla", "Rice", "Pasta", "Biscuit", "Sourdough", "Squash", "Crab", "Tuna", "Salmon", "Siracha", "Okra", "Quinoa", "Scallop", "Lamb", "Mayonnaise", "Mushroom", "Edamame", "Cheese", "Eggs", "Honey", "Butter", "Sausage", "Meatball",  "Chili", "Hummus", "Zucchini", "Melon", "Honeydew", "Watermelon"]; 
}

// variable used to make added ingredient buttons different colors
let butCol = 0;

$(function() {
    $('#match').on("click", genMatch);
    $('form').on("click", genRequest);
    $('#reset').on("click", resetRequest);
    $('#submit').on("click", submitRequest);
    $('input').keypress(function(ev){
        if (ev.keyCode === 13){
            addBut(ev);
        }
    });
    $('#food_complete').on('input', debounce(handleInput, 400));
});

function resetRequest(ev){
    document.getElementById("request").textContent = "";
    butCol = 0;
    $("#submit").replaceWith(`<button type="button" class="btn btn-outline-danger" id="submit">Submit</button>`);
    $("#response-container").replaceWith(emptyReq());
    $("#buttons").replaceWith(buttons());
    $("#response_movie").replaceWith(emptyRes());
    $("#match").replaceWith(`<button type="button" class="btn btn-outline-danger" id="match">Get my food-movie match!</button>`);
    $("#match").on("click", genMatch);
    $("#submit").on("click", submitRequest);
};

// changes button to selected when button clicked 
// alt input if for the 'addBut' function so that user-entered ingredients are automatically selected
function genRequest(ev, alt){
    let req;
    if (ev === null){
        req = alt;
    } else {
        req = ev.target.textContent;
        ev.target.className += " active";
    }
    let ideal = document.getElementById("request").textContent.trim();
    if (ideal === ""){
        document.getElementById("request").textContent = req;
    } else {
        document.getElementById("request").textContent += ", " + req;
    }
  };

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
 * Function 2: filters the ingredients array based on entered letters and updates the drop down list
 */
function handleInput(even){
    const inputData = even.target.value;
    let compl_res = food().filter(foo => foo.slice(0,inputData.length) === inputData);
    let a = document.createElement("div");
    a.id = "autocomplete-list";
    a.className = "autocomplete-items";
    document.getElementById('autocomplete-list').replaceWith(a);
    let b;
    for (let i = 0; i<compl_res.length; i++){
        b = document.createElement("div");
        b.innerText = compl_res[i];
        b.addEventListener('click', function(e){
            document.getElementById("food_complete").value = e.target.innerText;
            emptyList();
        });
        a.append(b);
    }
}

/**
 * Function 3: closes the drop down list when an option is selected
 */
function emptyList(){
    let a = document.createElement("div");
    a.id = "autocomplete-list";
    a.className = "autocomplete-items";
    document.getElementById('autocomplete-list').replaceWith(a);
}

// generates a selected ingredient button when someone hits enter from the ingredient input bar
function addBut(event){
    let newBut = document.createElement("button");
    let color; 
    //console.log(butCol);
    if (butCol === 0) color = "primary"
    else if (butCol === 1) color = "secondary"
    else if (butCol === 2) color = "success"
    else if (butCol === 3) color = "warning" 
    else if (butCol === 4) color = "info"
    else color = "danger"
    newBut.className = `btn btn-outline-${color} food active`;
    butCol = (butCol + 1) % 6;
    newBut.textContent = event.target.value;
    try {
        document.getElementById("buttons").append(newBut);

    } catch (error){
        alert(error);
    }
    
    genRequest(null, event.target.value);
    event.target.value = "";
}

// adds the favoriting button to both the movies and the recipes
// 'movie' input is true/false and distinguishes the movie from the recipe favorites
function genFavBut(movie){
    let but = document.createElement("button");
    if (movie){
        but.className = "btn btn-outline-danger fav movie";
    } else {
        but.className = "btn btn-outline-danger fav recipe";
    }
    but.addEventListener("click", like);
    let ii = document.createElement("i");
    ii.className = "fa fa-heart";
    but.append(ii);
    return but;
 }

 // distinguishes between whether a movie is being liked or a recipe is being liked and delegates based on that
 async function like(evt){
     evt.preventDefault();
     if (evt.target.className.includes("movie") || evt.target.parentElement.className.includes("movie")){
         storeMovieInfo(evt);
     } else {
        storeRecipeInfo(evt);
     }
 }

 // stores the title and link to liked recipe for the user logged in
 async function storeRecipeInfo(evt){
     evt.preventDefault();
     let titlee;
     let linkk;
    //console.log(evt.target);
    
    if (evt.target.className.includes("fa-heart")){
        titlee = evt.target.parentElement.parentElement.textContent;
        linkk = evt.target.parentElement.parentElement.href;
        evt.target.parentElement.className += " active";
    } else {
        titlee = evt.target.parentElement.textContent;
        linkk = evt.target.parentElement.href;
        evt.target.className += " active";
    }
    let loginn = window.sessionStorage.getItem('login');
    let data_string = JSON.stringify({
        login: loginn,
        title: titlee,
        link: linkk
    });

    let response = await $.ajax(appconfig.baseurl + "/addrecipe", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    }).catch((error) => {console.log(error)});

    if(response[0].result === 'UPDATE_SUCCESS') {
        
     }

 }

 // stores the movie id for the logged in user as favorite
 async function storeMovieInfo(evt){
    let idd;
    //console.log(evt.target);
        
    if (evt.target.className.includes("fa-heart")){
        idd = evt.target.parentElement.parentElement.id;
        evt.target.parentElement.className += " active";
    } else {
        idd = evt.target.parentElement.id;
        evt.target.className += " active";
    }
    //console.log(idd);
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

// does the recipe match based on the ingredient request from our RecipePuppy functions
async function submitRequest(ev){
    ev.target.className += " active";
    let ingrs = document.getElementById("request").textContent.trim().split(", ");
    //console.log(ingrs);
    let result = await makeRequest(ingrs);
    
    // formatting: https://getbootstrap.com/docs/4.0/components/list-group/
    // img: https://getbootstrap.com/docs/4.3/content/images/
    if (result.results === undefined || result.results.length === 0){
        document.getElementById("response-tit").textContent = "Sorry! No results :/";
    } else {
        document.getElementById("response-tit").textContent = "Here are some recipes you might like:";
        let results = result.results;
        let imp = document.createElement('div');
        imp.className = "list-group";
        imp.id = "response";
        for (let i = 0; i<results.length; i++){
            let ap = document.createElement("a");
            if (i%2 === 0){
                ap.className = "list-group-item list-group-item-action list-group-item-info";
            } else {
                ap.className = "list-group-item list-group-item-action list-group-item-danger";
            }
            ap.href = results[i].href;
            ap.target = "_blank";
            
            ap.textContent = results[i].title.trim() + "       ";
            let img = document.createElement("img");
            img.src = results[i].thumbnail;
            img.className = "img-thumbnail rounded float-right";
            ap.append(img);
            ap.append(genFavBut(false));
            imp.append(ap);
        }
        document.getElementById("response").replaceWith(imp);
    }
}

// does a search for movies based on the first ingredient name using our tmdb functions
async function genMatch(ev){
    ev.target.className += " active";
    let st = document.getElementById("request").textContent.split(",");
    //console.log(st);
    //console.log(st);
    let results = (await searchMovie(st[0])).results;
    //console.log(results);
    if (results.length === 0){
        document.getElementById("response_movie").textContent = "Sorry! No movie match for that request :(";
    } else {
        let imp = document.createElement('div');
    imp.className = "list-group";
    imp.id = "response_movie";
    for (let i = 0; i<results.length; i++){
        let ap = document.createElement("a");
        if (i%2 === 0){
            ap.className = "list-group-item list-group-item-action flex-column align-items-start";
        } else {
            ap.className = "list-group-item list-group-item-action ";
        }
        let div1 = document.createElement('div')
        div1.className = "d-flex w-100 justify-content-between";
        let div2 = document.createElement('div');
        div2.id = results[i].id;
        let h = document.createElement("h3");
        h.textContent = results[i].original_title.trim();
        h.className = "mb-1";
        let p = document.createElement('p');
        p.textContent = results[i].overview;
        let img = document.createElement("img");
        if (results[i].poster_path != null){
            img.src = getPoster(results[i].poster_path);
        } else {
            img.src = "./assets/img/genposter.jpg";
        }
        img.className = "img-thumbnail rounded float-right";
        div2.append(h);
        div2.append(p);
        div2.append(genFavBut(true));
        div1.append(div2);
        div1.append(img);
        ap.append(div1);
        imp.append(ap);
    }
    document.getElementById("response_movie").replaceWith(imp);
    }
    
}