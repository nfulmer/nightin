import {searchMovie,getPoster, getSimilarMovies} from "./js/tmdb.js";

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
});


// Handling front-end request bar
function resetRequest(ev){
    //ev.target.className += " active";
    document.getElementById("request").textContent = "";
    butCol = 0;
    //TO DO: reset buttons
};

function genRequest(ev, alt){
    let req;
    if (ev === null){
        req = alt;
    } else {
        req = ev.target.textContent;
        //ev.target.className += " disabled";
        ev.target.className += " active";
        //ev.target.off("click");
        // TO DO: make this work
        //ev.target.off("click", genRequest);
        
        //ev.target.attr("disabled", "disabled");
    }
    let ideal = document.getElementById("request").textContent.trim();
    if (ideal === ""){
        document.getElementById("request").textContent = req;
    } else {
        document.getElementById("request").textContent += ", " + req;
    }
    
  };

//aesthetic documentation: https://getbootstrap.com/docs/4.0/components/list-group/ 

async function getSim(even){
    document.getElementById("response-tit").textContent = "Here are some movies you might like:";
    even.target.className += " active";
    let movie = document.getElementById("request").value.trim();
    let result = await searchMovie(movie);
    let sim_result = await getSimilarMovies(result.results[0].id);
    let sim_results = sim_result.results;
    let imp = document.createElement('div');
    imp.className = "list-group";
    imp.id = "response";
    for (let i = 0; i<sim_results.length; i++){
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
        h.textContent = sim_results[i].original_title.trim();
        h.className = "mb-1";
        let p = document.createElement('p');
        p.textContent = sim_results[i].overview;
        let img = document.createElement("img");
        if (sim_results[i].poster_path != null){
            img.src = getPoster(sim_results[i].poster_path);
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