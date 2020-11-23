import {makeRequest} from "./js/puppy.js";

$(function() {
    $('form').on("click", genRequest);
    $('#reset').on("click", resetRequest);
    $('#submit').on("click", submitRequest);
    $('input').keypress(function(ev){
        if (ev.keyCode === 13){
            addBut(ev);
        }
    });
});

function addBut(event){
    let newBut = document.createElement("button");
    //newBut.type = "button";
    newBut.className = "btn btn-outline-secondary food active";
    newBut.textContent = event.target.value;
    try {
        document.getElementById("buttons").append(newBut);

    } catch (error){
        alert(error);
    }
    
    genRequest(null, event.target.value);
    event.target.value = "";
    //TO DO: dif colors
}


// Handling front-end request bar
function resetRequest(ev){
    ev.target.className += " active";
    document.getElementById("request").textContent = "";
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

// 
async function submitRequest(ev){
    ev.target.className += " active";
    let ingrs = document.getElementById("request").textContent.trim().split(", ");
   //console.log(ingrs);
    let baseURL = "https://recipe-puppy.p.rapidapi.com/?";
    for (let i = 0; i<ingrs.length; i++){
        if (i === 0){
            baseURL += "i=" + ingrs[i].toLowerCase();
        } else {
            baseURL += "%2C" + ingrs[i].toLowerCase();
        }
    }

    let result = await makeRequest(baseURL);
    //document.getElementById("response").textContent = result;
    // let titl = document.createElement("h3");
    // titl.className = "text-muted";
    // titl.textContent = "Here are some recipes you might like:";
    //document.getElementById("contain").append(titl);
    result = JSON.parse(result);
    let results = result.results;
    
    //    document.getElementById("response").textContent += JSON.parse(result);
    let imp = document.getElementById('response');
    //let liss = document.createElement("ul");
    //liss.classList.push("list-group")
    
    // formatting: https://getbootstrap.com/docs/4.0/components/list-group/
    // img: https://getbootstrap.com/docs/4.3/content/images/
    for (let i = 0; i<results.length; i++){
        let ap = document.createElement("a");
        if (i%2 === 0){
            ap.className = "list-group-item list-group-item-action list-group-item-info";
        } else {
            ap.className = "list-group-item list-group-item-action list-group-item-danger";
        }
        // let lis = document.createElement("li");
        // lis.classList.push("list-group-item");
        
        
        ap.href = results[i].href;
        ap.textContent = results[i].title.trim();
        //lis.append(ap);
        let img = document.createElement("img");
        img.src = results[i].thumbnail;
        img.className = "img-thumbnail rounded float-right";
        ap.append(img);
        //lis.append(img);
        imp.appendChild(ap);
        //imp.append(img);
    }
    //imp.append(liss);
    //document.getElementById("response").textContent = result.results;

;}