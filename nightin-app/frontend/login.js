$(function() {
    $('form').on("click", "#btnlogin", handleLoginSubmit);
});

const handleLoginSubmit = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    submitLogin(email, pass);
}

export const submitLogin = async function(email, pass) {
    let data_string = JSON.stringify({
        email: email,
        pass: pass
    });

    let response = await $.ajax("http://localhost:3000/verifyuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    alert("response: " + response);
    if(response) { 
        window.sessionStorage.setItem('name', "NIMA SUBRAMANIAM")
        window.location.href = "index.html"; 
    }
    else { window.location.href = "login.html"; }
}