$(function() {
    $('form').on("click", "#btnlogin", handleLoginSubmit);
    $('form').on("click", "#btnsignup", handleSignUp);
});

const handleLoginSubmit = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    if ( email == "" || pass=="" )
    {
        $('#pMessage').html(messages.LoginMessage1);
    }
    else
    {
        $('#pMessage').html(messages.EmptyString);
        submitLogin(email, pass);
    }
  
}

export const submitLogin = async function(email, pass) {
    let data_string = JSON.stringify({
        email: email,
        pass: pass
    });

    let response = await $.ajax(appconfig.baseurl + "/verifyuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })
    if(response[0].name === 'NOT_FOUND') {
         $('#pMessage').html(messages.LoginMessage2);
    }
    else { 
            //TO DO: create some sort of greeting for the user on index if there's a response
        window.sessionStorage.setItem('name', response[0].name);
        window.sessionStorage.setItem('login', response[0].login);
        window.location.href = "index.html";  
    }
}

const handleSignUp = function(e) {
    e.preventDefault();
    window.location.href = "signup.html";
}
