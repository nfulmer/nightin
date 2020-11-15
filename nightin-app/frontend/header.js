$(function () {
    loadHeader();
});

const loadHeader = function() {
    let view = 
    `<nav class="navbar navbar-expand-lg bg-danger fixed-top" id="mainNav">
    <a class="navbar-brand" href="/index"> <img src="assets/img/bby.png" height=70px width=70px> </a>
    <div class="container"><a class="navbar-brand js-scroll-trigger" href="/index">Night In</a>               
        <button class="navbar-toggler navbar-toggler-right font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu <i class="fas fa-bars"></i></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/moviesandrecipes"> MOVIES & RECIPES </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/login"> LOG IN </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/signup"> SIGN UP </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/contact"> CONTACT US </a> </li>
            </ul>
        </div>
    </div>
    </nav>`

    const $divRoot = $('#divroot');
    $divRoot.append(view);
    let logginname = window.sessionStorage.getItem('name');
    const $divLoggedIn = $('#loggedinuser');
    $divLoggedIn.append("Welcome " + logginname + "!");
}