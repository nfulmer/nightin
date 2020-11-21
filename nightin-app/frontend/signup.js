const UserMessage1 = "Missing informaton. Please fill out all fields.";
const UserMessage2 = "User already exists. Please enter a new email address.";
const UserMessage3 = "Please try entering your information again.";
const UserMessage4 = "Account created! Please login to continue.";
const EmptyString="";

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
        $('#pMessage').html(UserMessage1);
      }
    else
    {
        $('#pMessage').html('');
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

    let response = await $.ajax("http://localhost:3000/signupuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    if(response[0].result === 'USER_ALREADY_EXISTS') {
        $('#pMessage').html(UserMessage2);
     }
    else if (response[0].result === 'UPDATE_FAILED'){ 
        $('#pMessage').html(UserMessage3); 
       }
    else  {
        $('#pMessage').html(UserMessage4);
     } 
}