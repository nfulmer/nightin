$(function() {
    $('form').on("click", "#btnDeleteAccount", handleDelete); // delete account button pressed
    $('#email').val(window.sessionStorage.getItem('login')); // display email of logged in user
});

const handleDelete = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();

    if ( email == "" || pass=="" ) { // return an error message if user leaves missing values
        $('#pMessage').html(messages.SignupMessage1);
    }
    else { // call submit delete function
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

    if(response) { // log out user if account is deleted successfully
        $('#pMessage').html(messages.DeleteMessage1);
         window.location.href = "logout.html"; 
        }
    else { // incorrect info - tell user to input new values
        $('#pMessage').html(messages.SignupMessage3);
    }
}