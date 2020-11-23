$(function() {
    $('form').on("click",profile());
    $('form').on("click", "#btnChangePassword", handleChangePassword);
    $('form').on("click", "#btnDeleteAccount", handleDeleteAccount);
});

function profile(){
    let login = window.sessionStorage.getItem('login');
    getProfile(login);
}

export const getProfile = async function(login) {
    let data_string = JSON.stringify({
        email: login
    });

    let response = await $.ajax(appconfig.baseurl + "/getuserprofile", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })
    if(response[0].name === 'NOT_FOUND') {
         $('#pMessage').html(messages.LoginMessage2);
    }
    else { 
        $('#fname').val(response[0].firstname);
        $('#lname').val(response[0].lastname);
        $('#email').val(response[0].login);
    }
}

const handleChangePassword = function(e) {
    e.preventDefault();
    window.location.href = "password.html";
}

const handleDeleteAccount = function(e) {
    e.preventDefault();
    window.location.href = "delete.html";
}