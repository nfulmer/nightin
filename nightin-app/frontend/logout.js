$(function() {
    $('form').on("click",fnLogout());
});

function fnLogout(){
    window.sessionStorage.clear();
    window.location.href = "index.html"; 
}