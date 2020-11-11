/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); */

//const axios = require('axios').default;

window.onload = (event) => {
  alert("This script is doing things!");
  document.getElementById("onion").addEventListener("click", makeRequest);
};

async function makeRequest(ev){
  let searchParam = ev.target.textContent;
  alert(searchParam);

  // let res = await fetch({
  //   method: "GET",
  //   url: "http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3",
  // });

  // alert(res.status);
  // let stuff = document.createElement("p");
  // stuff.textContent = res.data;
  // document.getElementById("generate_content").append(stuff);

  const res = await fetch("https://recipe-puppy.p.rapidapi.com/?p=1&i=onions&q=omelet", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
		"x-rapidapi-key": "d02ad0adf9msh642490ab5e606bfp156cc1jsn12ec2adcd63d"
	}
}).then(response => {
    alert(response.status);
    return response.text();
  }).then(function(data){
    let stuff = document.createElement("p");
    stuff.textContent = data;
    document.getElementById("generate_content").append(stuff);
  });
};