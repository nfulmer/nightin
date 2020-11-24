$(function() {
    $('form').on("click",fnLogout()); // logout is clicked
});

function fnLogout(){ // clear user data and move to index
    window.sessionStorage.clear();
    window.location.href = "index.html"; 
}