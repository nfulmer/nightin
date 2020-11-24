$(function() {
    $('form').on("click", "#btnlogin", handleLoginSubmit); // login button pressed
    $('form').on("click", "#btnsignup", handleSignUp); // signup button pressed
});

const handleLoginSubmit = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    if ( email == "" || pass=="" ) { // missing values - inform user
        $('#pMessage').html(messages.LoginMessage1);
    }
    else { // call submit login function
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

    if(response[0].name === 'NOT_FOUND') { // incorrect login info entered, inform user
         $('#pMessage').html(messages.LoginMessage2);
    }
    else { // successfil login - change header, take to profile page
        window.sessionStorage.setItem('name', response[0].name);
        window.sessionStorage.setItem('login', response[0].login);
        window.location.href = "profile.html";  
    }
}

const handleSignUp = function(e) { // take user to signup page
    e.preventDefault();
    window.location.href = "signup.html";
}
