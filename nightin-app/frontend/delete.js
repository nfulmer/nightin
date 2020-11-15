$(function() {
    $('form').on("click", "#btnDeleteAccount", handleDelete);
});

const handleDelete = function(e) {
    e.preventDefault();
    var email = $("#email").val();
    var pass = $("#pass").val();
    submitDelete(email, pass);
}

export const submitDelete = async function(email, pass) {
    let data_string = JSON.stringify({
        email: email,
        pass: pass
    });

    let response = await $.ajax("http://localhost:3000/deleteuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })

    if(response) { window.location.href = "index.html"; }
    else { window.location.href = "delete.html"; }
}