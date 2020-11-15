$(function() {
    $('form').on("click", "#btnsignup", handleSignUpSubmit);
});

const handleSignUpSubmit = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    submitSignUp(email, pass, fname, lname);
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

    if(response) { 
        window.location.href = "login.html"; 
    }
    else { 
        window.location.href = "signup.html"; 
    }
}