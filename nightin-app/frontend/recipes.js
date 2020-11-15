import {makeRequest} from "./js/puppy.js";


 // TO DO: see more results from search
 
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

const emptyReq = () => {
    return `<div class="response-container">
    <h3 class="text-muted" id="reponse-tit"></h3>
    <div class="list-group" id="response">
    </div>
    </div>`
}

let butCol = 0;

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
    let color; 
    console.log(butCol);
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
    //TO DO: dif colors
}


// Handling front-end request bar
function resetRequest(ev){
    //ev.target.className += " active";
    document.getElementById("request").textContent = "";
    butCol = 0;
    document.getElementById("buttons").replaceWith(jQuery(buttons()));
    document.getElementById("response-request").replaceWith(jQuery(emptyReq()));

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
    let result = await makeRequest(ingrs);
    
    // formatting: https://getbootstrap.com/docs/4.0/components/list-group/
    // img: https://getbootstrap.com/docs/4.3/content/images/
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
        ap.textContent = results[i].title.trim();
        let img = document.createElement("img");
        img.src = results[i].thumbnail;
        img.className = "img-thumbnail rounded float-right";
        ap.append(img);
        imp.append(ap);
    }
    document.getElementById("response").replaceWith(imp);
;}
