$(function() {
    $('form').on("click", "#btnUpdatePassword", handleUpdate);
   // $('form').on("focus", "#email", handleEmailfocus);
});

const handleUpdate = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var passold = $("#passold").val();
    var passnew = $("#passnew").val();

    if ( email == "" || passold=="" || passnew=="")
    {
        $('#pMessage').html(messages.SignupMessage1);
    }
    else
    {
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

    if(response) {
        $('#pMessage').html(messages.PasswordMessage1);   
        //window.location.href = "index.html"; 
    }
    else { 
        $('#pMessage').html(messages.SignupMessage3);
            //window.location.href = "password.html";
    }
}

const handleEmailfocus = function(e) {
    e.preventDefault();

    $('#pMessage').html(''); 
}
