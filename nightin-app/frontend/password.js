$(function() {
    $('form').on("click", "#btnUpdatePassword", handleUpdate);
   // $('form').on("focus", "#email", handleEmailfocus);
});

const handleUpdate = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var passold = $("#passold").val();
    var passnew = $("#passnew").val();

    if ( email == "" || pass=="" )
    {
        $('#pMessage').html('!!! Missing information, please fix and proceed. !!!');
    }
    else
    {
        $('#pMessage').html('');
        submitUpdate(email, passold, passnew);
    }
  
}

export const submitUpdate = async function(email, passold, passnew) {
    let data_string = JSON.stringify({
        email: email,
        passold: passold, 
        passnew: passnew
    });

    let response = await $.ajax("http://localhost:3000/updatepassword", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    if(response) {
        $('#pMessage').html(' !!! Password updated successfully  !!!');   
        //window.location.href = "index.html"; 
    }
    else { 
        $('#pMessage').html(' !!! Unable to update password. Please try again.  !!!');
            //window.location.href = "password.html";
    }
}

const handleEmailfocus = function(e) {
    e.preventDefault();

    $('#pMessage').html(''); 
}
