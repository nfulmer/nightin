$(function() {
    $('form').on("click", "#btnDeleteAccount", handleDelete);
    $('#email').val(window.sessionStorage.getItem('login'));
});

const handleDelete = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();

    if ( email == "" || pass=="" )
    {
        $('#pMessage').html(messages.SignupMessage1);
    }
    else
    {
        $('#pMessage').html(messages.EmptyString);
        submitDelete(email, pass);
    }
 
}

export const submitDelete = async function(email, pass) {
    let data_string = JSON.stringify({
        email: email,
        pass: pass
    });

    let response = await $.ajax(appconfig.baseurl + "/deleteuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    if(response) {
        $('#pMessage').html(messages.DeleteMessage1);
         window.location.href = "logout.html"; 
        }
    else {
        $('#pMessage').html(messages.SignupMessage3);
        }
}