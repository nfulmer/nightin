

$(function() {
    $('form').on("click", "#btnsignup", handleSignUpSubmit);
});

const handleSignUpSubmit = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    if ( email == "" || pass=="" || fname ==""|| lname=="")
    {
        $('#pMessage').html(messages.SignupMessage1);
      }
    else
    {
        $('#pMessage').html(messages.EmptyString);
        submitSignUp(email, pass, fname, lname);
    }
 
}

export const submitSignUp = async function(email, pass, fname, lname) {
    let data_string = JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        pass: pass
    });

    let response = await $.ajax(appconfig.baseurl + "/signupuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    if(response[0].result === 'USER_ALREADY_EXISTS') {
        $('#pMessage').html(messages.SignupMessage2);
     }
    else if (response[0].result === 'UPDATE_FAILED'){ 
        $('#pMessage').html(messages.SignupMessage3); 
       }
    else  {
        $('#pMessage').html(messages.SignupMessage4);
     } 
}