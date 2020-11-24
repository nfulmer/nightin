$(function() {
    $('form').on("click", "#btnsignup", handleSignUpSubmit); // signup button pressed
});

const handleSignUpSubmit = function(e) {
    e.preventDefault();
    e.target.className += " active";
    var email = $("#email").val();
    var pass = $("#pass").val();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    if ( email == "" || pass=="" || fname ==""|| lname=="") { // missing values - inform user
        $('#pMessage').html(messages.SignupMessage1);
    }
    else { // call submit signup function
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
    console.log(data_string);
    let response = await $.ajax(appconfig.baseurl + "/signupuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    });

    console.log(response);

    if(response[0].result === 'USER_ALREADY_EXISTS') { // email has been used and stored in database
        $('#pMessage').html(messages.SignupMessage2);
    }
    else if (response[0].result === 'UPDATE_FAILED') {  // error entering information - ask user to enter new values
        $('#pMessage').html(messages.SignupMessage3); 
    }
    else  { // user created take them to the login page
        $('#pMessage').html(messages.SignupMessage4);
        setTimeout(function(){window.location.href = "login.html";}, 3000);
    } 
}