$(function () {
    loadHeader();
});

const loadHeader = function() {
    let view = 
    `<nav class="navbar navbar-expand-lg bg-danger fixed-top" id="mainNav">
    <a class="navbar-brand" href="/index"> <img src="assets/img/bby.png" height=40px width=40px>Night In </a>
        <button class="navbar-toggler navbar-toggler-right font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu <i class="fas fa-bars"></i></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/movies"> MOVIES </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/recipes"> RECIPES </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/login"> LOG IN/SIGN UP </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/contact"> CONTACT US </a> </li>
            </ul>
         </div>
    </nav>`

    let view2 = 
    `<nav class="navbar navbar-expand-lg bg-danger fixed-top" id="mainNav">
    <a class="navbar-brand" href="/index"> <img src="assets/img/bby.png" height=40px width=40px>Night In </a>
        <button class="navbar-toggler navbar-toggler-right font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu <i class="fas fa-bars"></i></button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/movies"> MOVIES </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/recipes"> RECIPES </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/profile"> PROFILE </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/logout"> LOG OUT </a> </li>
                <li class="nav-item mx-0 mx-lg-1"> <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/contact"> CONTACT US </a> </li>
            </ul>
         </div>
    </nav>`

    let logginname = window.sessionStorage.getItem('name');
    const $divRoot = $('#divroot');

    if (logginname == null)
        $divRoot.append(view);
    else
        $divRoot.append(view2);
}