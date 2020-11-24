$(function() {
    $('form').on("click", "#btnUpdatePassword", handleUpdate); // update password button is pressed
   $('#email').val(window.sessionStorage.getItem('login')); // display user's email information
});

const handleUpdate = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var passold = $("#passold").val();
    var passnew = $("#passnew").val();

    if ( email == "" || passold=="" || passnew=="") { // missing information - inform user
        $('#pMessage').html(messages.SignupMessage1);
    }
    else { // call submit update function
        $('#pMessage').html(messages.EmptyString);
        submitUpdate(email, passold, passnew);
    }
  
}

export const submitUpdate = async function(email, passold, passnew) {
    let data_string = JSON.stringify({
        email: email,
        passold: passold, 
        passnew: passnew
    });

    let response = await $.ajax(appconfig.baseurl + "/updatepassword", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    if(response) { // password change completed
        $('#pMessage').html(messages.PasswordMessage1);   
    }
    else { // information is incorrect - inform user to enter new values
        $('#pMessage').html(messages.SignupMessage3);
    }
}