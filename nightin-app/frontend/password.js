$(function() {
    $('form').on("click", "#btnUpdatePassword", handleUpdate);
});

const handleUpdate = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var passold = $("#passold").val();
    var passnew = $("#passnew").val();
    submitUpdate(email, passold, passnew);
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

    if(response) { window.location.href = "index.html"; }
    else { window.location.href = "password.html"; }
}