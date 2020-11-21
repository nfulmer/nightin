const UserMessage1 = "Enter your username and password.";
const UserMessage2 = "User does not exist. Please sign up to continue.";
const EmptyString="";

$(function() {
    $('form').on("click", "#btnlogin", handleLoginSubmit);
    $('form').on("click", "#btnChangePassword", handleChangePassword);
    $('form').on("click", "#btnDeleteAccount", handleDeleteAccount);
    
});

const handleLoginSubmit = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    if ( email == "" || pass=="" )
    {
        $('#pMessage').html(UserMessage1);
    }
    else
    {
        $('#pMessage').html(EmptyString);
        submitLogin(email, pass);
    }
  
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
    if(response[0].name === 'NOT_FOUND') {
         $('#pMessage').html(UserMessage2);
    }
    else { 
            //TO DO: create some sort of greeting for the user on index if there's a response
        window.sessionStorage.setItem('name', response[0].name);
        window.location.href = "index.html";  
    }
}

const handleChangePassword = function(e) {
    e.preventDefault();
    window.location.href = "password.html";
}

const handleDeleteAccount = function(e) {
    e.preventDefault();
    window.location.href = "delete.html";
}
